import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectMongoDB } from '../../../../../lib/mongodb';
import OAuthUser from '../../../../../models/OAuthUser';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/', 
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async session({ session, token }) {
      if (token?.email) {
        await connectMongoDB();
        const user = await OAuthUser.findOne({ email: token.email });
        if (user) {
        
          session.user = {
            ...session.user,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
          };
        }
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;

        await connectMongoDB();
        const existingUser = await OAuthUser.findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user if it doesn't exist
          await OAuthUser.create({
            email: user.email,
            googleId: user.id,
            firstname: user.name?.split(' ')[0] || '',
            lastname: user.name?.split(' ')[1] || '',
          });
        } else if (!existingUser.googleId) {
          await OAuthUser.updateOne(
            { email: user.email },
            { googleId: user.id }
          );
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
