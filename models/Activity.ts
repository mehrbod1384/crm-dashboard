import mongoose, { InferSchemaType } from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["CALL", "MEETING", "EMAIL", "NOTE"],
      required: true,
    },
    content: {
      type: String,
      required: [true, "Activity content is required"],
      trim: true,
      maxlength: [1000, "Activity content must be at most 1000 charecters"],
    },
  },
  {
    timestamps: true,
  },
);

export type ActivityType = InferSchemaType<typeof ActivitySchema>;

const Activity =
  mongoose.model("Activity", ActivitySchema) || mongoose.models.Activity;

export default Activity;
