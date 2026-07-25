import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trinm: true,
      minlength: [2, "Name must be at least 2 charecters"],
      maxlength: [30, "Name must be at most 30 charecters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 charecters"],
      select: false,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export type UserType = InferSchemaType<typeof UserSchema>;

const User = mongoose.model("User", UserSchema) || mongoose.models.User;

export default User;
