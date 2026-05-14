import mongoose from 'mongoose';
import TempleHistory from './models/TempleHistory';
import TempleReach from './models/TempleReach';
import PresidentMessage from './models/PresidentMessage';
import Trustee from './models/Trustee';
import DailySchedule from './models/DailySchedule';

const MONGODB_URI = "mongodb+srv://renukagite23_db_user:98R2UY0lY7jvVIjm@cluster0.ba0ktzk.mongodb.net/kulachar_nidhi";

async function migrate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Starting migration...');

    // TempleHistory
    const historyResult = await TempleHistory.updateMany(
      { status: { $exists: false } },
      [
        {
          $set: {
            status: { $cond: { if: { $eq: ['$isPublished', true] }, then: 'published', else: 'draft' } }
          }
        }
      ]
    );
    console.log('TempleHistory migrated:', historyResult.modifiedCount);

    // TempleReach
    const reachResult = await TempleReach.updateMany(
      { status: { $exists: false } },
      [
        {
          $set: {
            status: { $cond: { if: { $eq: ['$isPublished', true] }, then: 'published', else: 'draft' } }
          }
        }
      ]
    );
    console.log('TempleReach migrated:', reachResult.modifiedCount);

    // PresidentMessage
    const presidentResult = await PresidentMessage.updateMany(
      { status: { $exists: false } },
      [
        {
          $set: {
            status: { $cond: { if: { $eq: ['$isPublished', true] }, then: 'published', else: 'draft' } }
          }
        }
      ]
    );
    console.log('PresidentMessage migrated:', presidentResult.modifiedCount);

    // Trustee
    const trusteeResult = await Trustee.updateMany(
      { status: { $exists: false } },
      [
        {
          $set: {
            status: { $cond: { if: { $eq: ['$isActive', true] }, then: 'published', else: 'draft' } }
          }
        }
      ]
    );
    console.log('Trustee migrated:', trusteeResult.modifiedCount);

    // DailySchedule
    const scheduleResult = await DailySchedule.updateMany(
      { status: { $exists: false } },
      { $set: { status: 'published' } }
    );
    console.log('DailySchedule migrated:', scheduleResult.modifiedCount);

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
