import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import Notification from '@/models/Notification';
import User from '@/models/User';
import { getSafeMessaging } from '@/lib/firebase-admin';

const EventSchema = new mongoose.Schema(
  {
    title_en: String,
    title_mr: String,
    desc_en: String,
    desc_mr: String,
    date: String,
    image: String,
  },
  { timestamps: true }
);

const Event =
  mongoose.models.Event || mongoose.model('Event', EventSchema);

// ✅ GET EVENTS
export async function GET() {
  try {
    await dbConnect();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(events);
  } catch (error) {
    console.error('GET EVENTS ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// ✅ CREATE EVENT
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const newEvent = await Event.create({
      title_en: body.title_en,
      title_mr: body.title_mr,
      desc_en: body.desc_en,
      desc_mr: body.desc_mr,
      date: body.date,
      image: body.image || '',
    });

    // Create Notification
    try {
      await Notification.create({
        title: 'New Event Broadcasted',
        titleMr: 'नवीन कार्यक्रम प्रसारित झाला',
        message: `A new temple event "${newEvent.title_en}" has been announced for ${newEvent.date}.`,
        messageMr: `नवीन मंदिर कार्यक्रम "${newEvent.title_mr}" ${newEvent.date} साठी जाहीर करण्यात आला आहे.`,
        type: 'event',
      });

      // Send Firebase Push Notification
      try {
        // Fetch all users with a valid FCM token
        const users = await User.find({ fcmToken: { $exists: true, $ne: null } }).select('fcmToken');
        const tokens = users.map(u => u.fcmToken).filter(Boolean);

        if (tokens.length > 0) {
          const payload = {
            notification: {
              title: 'Kulachar Nidhi - New Temple Event',
              body: `A new temple event "${newEvent.title_en}" has been announced for ${newEvent.date}.`,
            },
            data: {
              type: 'event',
              eventId: newEvent._id.toString()
            },
            tokens: tokens
          };

          const msg = getSafeMessaging();
          if (msg) {
            const response = await msg.sendEachForMulticast(payload);
            console.log(`Successfully sent ${response.successCount} messages; Failed ${response.failureCount}`);
          } else {
            console.error('Firebase has not initialized correctly, skipped sending notifications.');
          }
        } else {
          console.log('No FCM tokens found to send push notification.');
        }
      } catch (pushError) {
        console.error('Failed to send push notifications:', pushError);
      }
    } catch (notifError) {
      console.error('Failed to create event notification:', notifError);
    }

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('POST EVENT ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}