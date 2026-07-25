import mongoose, { InferSchemaType } from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      minlength: [2, "Customer name must be at least 2 charecters"],
      maxlength: [50, "Customer name must be at most 50 charecters"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "NEGOTIATION", "WON", "LOST"],
      default: "NEW",
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type CustomerType = InferSchemaType<typeof CustomerSchema>;

const Customer =
  mongoose.model("Customer", CustomerSchema) || mongoose.models.Customer;

export default Customer;
