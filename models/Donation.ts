import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: [true, 'Please provide donor name'],
  },
  mobileNumber: {
    type: String,
    required: [true, 'Please provide mobile number'],
  },
  address: String,
  amount: {
    type: Number,
    required: [true, 'Please provide amount'],
  },
  reason: {
    type: String,
    required: [true, 'Please provide reason'],
    enum: ['Birthday', 'Navratri', 'Javal (Munji)', 'Custom'],
  },
  customReason: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    default: 'UPI',
  },
  transactionId: String,
  receiptNumber: {
    type: String,
    unique: true,
  },
  collector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringInterval: {
    type: String,
    enum: ['monthly', 'yearly', 'none'],
    default: 'none',
  },
  donorBirthday: Date,
  donorPhoto: String,
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model('Donation', DonationSchema);
