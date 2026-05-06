import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'chairman', 'collector'],
    default: 'user',
  },
  phone: String,
  totalDonations: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
