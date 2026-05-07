import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  amount: {
    type: Number,
  },
}, { timestamps: true });

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
