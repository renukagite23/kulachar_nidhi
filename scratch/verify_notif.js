const mongoose = require('mongoose');

async function test() {
    const mongoUri = 'mongodb://renukagite23_db_user:98R2UY0lY7jvVIjm@ac-znrji7a-shard-00-00.ba0ktzk.mongodb.net:27017,ac-znrji7a-shard-00-01.ba0ktzk.mongodb.net:27017,ac-znrji7a-shard-00-02.ba0ktzk.mongodb.net:27017/kulachar_nidhi?ssl=true&replicaSet=atlas-b7ow9o-shard-0&authSource=admin&retryWrites=true&w=majority';
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const NotificationSchema = new mongoose.Schema({
        userId: mongoose.Schema.Types.ObjectId,
        title: String,
        titleMr: String,
        message: String,
        messageMr: String,
        type: String,
        createdAt: Date
    }, { timestamps: true });

    const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

    const latestNotification = await Notification.findOne({ type: 'REMINDER' }).sort({ createdAt: -1 });
    console.log('Latest Notification:', JSON.stringify(latestNotification, null, 2));

    await mongoose.disconnect();
}

test().catch(console.error);
