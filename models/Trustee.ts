import mongoose, { Schema, Document } from 'mongoose';

export interface ITrustee extends Document {
  english: {
    name: string;
    designation: string;
    description: string;
  };
  marathi: {
    name: string;
    designation: string;
    description: string;
  };
  image: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const TrusteeSchema: Schema = new Schema(
  {
    english: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      description: { type: String },
    },
    marathi: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      description: { type: String },
    },
    image: { type: String },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Trustee || mongoose.model<ITrustee>('Trustee', TrusteeSchema);
