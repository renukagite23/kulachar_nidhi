import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
