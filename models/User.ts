import mongoose, {
  Schema,
  models,
  model,
  type InferSchemaType,
} from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be at most 100 characters"],
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
      minlength: [6, "Password must be at least 6 characters"],
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

const User = models.User || model("User", UserSchema);

export default User;
