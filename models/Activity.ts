import { Schema, models, model, type InferSchemaType } from "mongoose";

const ActivitySchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
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
      maxlength: [1000, "Activity content must be at most 1000 characters"],
    },
  },
  {
    timestamps: true,
  },
);

export type ActivityType = InferSchemaType<typeof ActivitySchema>;

const Activity = models.Activity || model("Activity", ActivitySchema);

export default Activity;
