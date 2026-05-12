import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
    {
        videoUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        thumbnailUrl: {
            type: String,
            default: '',
        },
        isYouTube: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
