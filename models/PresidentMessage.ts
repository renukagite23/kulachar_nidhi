import mongoose, { Schema, Document } from 'mongoose';

export interface IPresidentMessage extends Document {
  english: {
    name: string;
    designation: string;
    title: string;
    description: string;
    majorWorksTitle: string;
    majorWorks: string;
    staffQuartersTitle: string;
    staffQuarters: string;
    donorRemembrance: string;
    legacyText: string;
    stats: { label: string; value: string }[];
    heroTitle: string;
    heroSubtitle: string;
  };
  marathi: {
    name: string;
    designation: string;
    title: string;
    description: string;
    majorWorksTitle: string;
    majorWorks: string;
    staffQuartersTitle: string;
    staffQuarters: string;
    donorRemembrance: string;
    legacyText: string;
    stats: { label: string; value: string }[];
    heroTitle: string;
    heroSubtitle: string;
  };
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const PresidentMessageSchema: Schema = new Schema(
  {
    english: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      majorWorksTitle: { type: String },
      majorWorks: { type: String },
      staffQuartersTitle: { type: String },
      staffQuarters: { type: String },
      donorRemembrance: { type: String },
      legacyText: { type: String },
      heroTitle: { type: String },
      heroSubtitle: { type: String },
      stats: [
        {
          label: { type: String },
          value: { type: String },
        },
      ],
    },
    marathi: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      majorWorksTitle: { type: String },
      majorWorks: { type: String },
      staffQuartersTitle: { type: String },
      staffQuarters: { type: String },
      donorRemembrance: { type: String },
      legacyText: { type: String },
      heroTitle: { type: String },
      heroSubtitle: { type: String },
      stats: [
        {
          label: { type: String },
          value: { type: String },
        },
      ],
    },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.PresidentMessage || mongoose.model<IPresidentMessage>('PresidentMessage', PresidentMessageSchema);
