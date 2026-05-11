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

async function checkDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        const images = await Gallery.find();
        console.log('Gallery Images:', JSON.stringify(images, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkDb();
