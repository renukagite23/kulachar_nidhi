import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title_en: String,
    title_mr: String,
    desc_en: String,
    desc_mr: String,
    date: String,
    image: String,
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);