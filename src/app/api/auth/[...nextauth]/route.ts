import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        firstname: { label: 'Firstname', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log('No credentials provided.');
          return null;
        }

        const { email, password, firstname } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          const userByName = await User.findOne({ firstname });

          if (!user) {
            console.log('No user found with this email.');
            return null;
          }

          if (!userByName) {
            console.log('No user found with this firstname.');
            return null;
          }

          const checkPass = await bcrypt.compare(password, user.password);

          if (!checkPass) {
            console.log('Password is incorrect.');
            return null;
          }

          return user;
        } catch (error) {
          console.error('Error authorizing user:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/', 
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    session({ session, token, user }) {
      return session}
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
