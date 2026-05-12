import mongoose, { Schema, Document } from 'mongoose';

export interface ITempleReach extends Document {
  english: {
    address: string;
    landmark: string;
    district: string;
    state: string;
    transportation: string;
    travelInstructions: string;
    contactInfo: string;
  };
  marathi: {
    address: string;
    landmark: string;
    district: string;
    state: string;
    transportation: string;
    travelInstructions: string;
  };
  mapEmbedUrl: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TempleReachSchema: Schema = new Schema(
  {
    english: {
      address: { type: String, required: true },
      landmark: { type: String },
      district: { type: String },
      state: { type: String },
      transportation: { type: String },
      travelInstructions: { type: String },
      contactInfo: { type: String },
    },
    marathi: {
      address: { type: String, required: true },
      landmark: { type: String },
      district: { type: String },
      state: { type: String },
      transportation: { type: String },
      travelInstructions: { type: String },
    },
    mapEmbedUrl: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.TempleReach || mongoose.model<ITempleReach>('TempleReach', TempleReachSchema);
