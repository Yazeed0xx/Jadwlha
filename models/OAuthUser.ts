import mongoose, { Schema, models } from 'mongoose';

const oauthUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    googleId: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const OAuthUser = models.OAuthUser || mongoose.model('OAuthUser', oauthUserSchema);
export default OAuthUser;
