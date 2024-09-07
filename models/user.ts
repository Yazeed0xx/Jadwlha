import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: { type: String}

  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;