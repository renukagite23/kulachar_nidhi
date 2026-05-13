import mongoose, { Schema, Document } from 'mongoose';

interface IScheduleItem {
  time: string;
  heading: string;
  description?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

interface IScheduleLanguage {
  title: string;
  subtitle: string;
  schedules: IScheduleItem[];
}

export interface IDailySchedule extends Document {
  english: IScheduleLanguage;
  marathi: IScheduleLanguage;
  updatedAt: Date;
}

const ScheduleItemSchema = new Schema<IScheduleItem>({
  time: { type: String, required: true },
  heading: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

const ScheduleLanguageSchema = new Schema<IScheduleLanguage>({
  title: { type: String, default: 'Daily Schedule' },
  subtitle: { type: String, default: 'Temple Timing Management' },
  schedules: [ScheduleItemSchema],
});

const DailyScheduleSchema = new Schema<IDailySchedule>({
  english: { type: ScheduleLanguageSchema, required: true },
  marathi: { type: ScheduleLanguageSchema, required: true },
}, { timestamps: true });

export default mongoose.models.DailySchedule || mongoose.model<IDailySchedule>('DailySchedule', DailyScheduleSchema);
