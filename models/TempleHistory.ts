import mongoose, { Schema, Document } from 'mongoose';

export interface ITempleHistory extends Document {
  english: {
    title: string;
    subtitle: string;
    shortDescription: string;
    fullContent: string;
  };
  marathi: {
    title: string;
    subtitle: string;
    shortDescription: string;
    fullContent: string;
  };
  image: string;
  gallery: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TempleHistorySchema: Schema = new Schema(
  {
    english: {
      title: { type: String, required: true },
      subtitle: { type: String },
      shortDescription: { type: String },
      fullContent: { type: String, required: true },
    },
    marathi: {
      title: { type: String, required: true },
      subtitle: { type: String },
      shortDescription: { type: String },
      fullContent: { type: String, required: true },
    },
    image: { type: String },
    gallery: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.TempleHistory || mongoose.model<ITempleHistory>('TempleHistory', TempleHistorySchema);
