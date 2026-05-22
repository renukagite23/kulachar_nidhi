const mongoose = require('mongoose');

async function test() {
    const mongoUri = 'mongodb://renukagite23_db_user:98R2UY0lY7jvVIjm@ac-znrji7a-shard-00-00.ba0ktzk.mongodb.net:27017,ac-znrji7a-shard-00-01.ba0ktzk.mongodb.net:27017,ac-znrji7a-shard-00-02.ba0ktzk.mongodb.net:27017/kulachar_nidhi?ssl=true&replicaSet=atlas-b7ow9o-shard-0&authSource=admin&retryWrites=true&w=majority';
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const UserSchema = new mongoose.Schema({
        name: String,
        familyMembers: [{
            name: String,
            dob: String
        }]
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const users = await User.find({ 'familyMembers.0': { $exists: true } }).limit(5);
    console.log('Users with family members:', JSON.stringify(users, null, 2));

    // Tomorrow calculation
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    console.log('Tomorrow:', tomorrowStr);

    if (users.length > 0) {
        const testUser = users[0];
        testUser.familyMembers[0].dob = tomorrowStr;
        await testUser.save();
        console.log(`Updated user ${testUser.name} family member ${testUser.familyMembers[0].name} dob to ${tomorrowStr}`);
    }

    await mongoose.disconnect();
}

test().catch(console.error);
