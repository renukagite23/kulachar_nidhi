import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        startDate: Date,
        endDate: Date,
        location: String,
        image: {
            type: String,
            default: '/devi.png',
        },
        slug: String,
    },
    { timestamps: true }
);

export default mongoose.models.Event || mongoose.model('Event', EventSchema);