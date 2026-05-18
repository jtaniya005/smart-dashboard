import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "lost";
  assignedTo?: string;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "qualified",
        "lost"
      ],
      default: "new"
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }

  },
  {
    timestamps: true
  }
);

export default mongoose.model<ILead>(
  "Lead",
  leadSchema
);