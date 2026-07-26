import mongoose, {
  Schema,
  models,
  model,
  type InferSchemaType,
} from "mongoose";

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      minlength: [2, "Customer name must be at least 2 characters"],
      maxlength: [120, "Customer name must be at most 120 characters"],
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type CustomerType = InferSchemaType<typeof CustomerSchema>;

const Customer = models.Customer || model("Customer", CustomerSchema);

export default Customer;
