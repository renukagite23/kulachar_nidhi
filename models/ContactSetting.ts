import mongoose, { Schema, Document } from 'mongoose';

export interface IContactSetting extends Document {
  address: string;
  addressMr: string;
  email: string;
  phone: string;
  workingHours: string;
  workingHoursMr: string;
  mapEmbedUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSettingSchema: Schema = new Schema(
  {
    address: { type: String, required: true },
    addressMr: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    workingHours: { type: String, required: true },
    workingHoursMr: { type: String, required: true },
    mapEmbedUrl: { type: String },
  },
  { timestamps: true }
);

// Prevent multiple model compilation in development
delete mongoose.models.ContactSetting;
export default mongoose.models.ContactSetting || mongoose.model<IContactSetting>('ContactSetting', ContactSettingSchema);
