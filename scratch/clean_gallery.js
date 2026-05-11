const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const GallerySchema = new mongoose.Schema(
    {
        imageUrl: { type: String, required: true },
        caption: { type: String, default: '' },
    },
    { timestamps: true }
);

const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

async function cleanDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        
        // Delete documents where imageUrl is missing or empty
        const result = await Gallery.deleteMany({
            $or: [
                { imageUrl: { $exists: false } },
                { imageUrl: "" },
                { imageUrl: null }
            ]
        });
        
        console.log(`Deleted ${result.deletedCount} invalid images.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

cleanDb();
