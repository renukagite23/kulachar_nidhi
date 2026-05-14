import mongoose, { Schema, Document } from 'mongoose';

export interface ITempleHistory extends Document {
  english: {
    title: string;
    heroSubtitle: string;
    introQuote: string;
    section1Title: string;
    section1Content: string;
    section2Title: string;
    section2Content: string;
    stats: { label: string; value: string }[];
    modernTitle: string;
    modernContent: string;
  };
  marathi: {
    title: string;
    heroSubtitle: string;
    introQuote: string;
    section1Title: string;
    section1Content: string;
    section2Title: string;
    section2Content: string;
    stats: { label: string; value: string }[];
    modernTitle: string;
    modernContent: string;
  };
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const TempleHistorySchema: Schema = new Schema(
  {
    english: {
      title: { type: String },
      heroSubtitle: { type: String },
      introQuote: { type: String },
      section1Title: { type: String },
      section1Content: { type: String },
      section2Title: { type: String },
      section2Content: { type: String },
      stats: [{ label: { type: String }, value: { type: String } }],
      modernTitle: { type: String },
      modernContent: { type: String },
    },
    marathi: {
      title: { type: String },
      heroSubtitle: { type: String },
      introQuote: { type: String },
      section1Title: { type: String },
      section1Content: { type: String },
      section2Title: { type: String },
      section2Content: { type: String },
      stats: [{ label: { type: String }, value: { type: String } }],
      modernTitle: { type: String },
      modernContent: { type: String },
    },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.TempleHistory || mongoose.model<ITempleHistory>('TempleHistory', TempleHistorySchema);
