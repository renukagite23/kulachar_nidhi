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

async function testAdd() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        
        const newImage = await Gallery.create({
            imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000',
            caption: 'Test Divine Image'
        });
        
        console.log('Added image:', newImage);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

testAdd();
