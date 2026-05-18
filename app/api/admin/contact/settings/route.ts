import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import ContactSetting from '@/models/ContactSetting';
import { getDataFromToken } from '@/lib/auth';
import { hasAdminAccess } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    let settings = await ContactSetting.findOne().lean();
    if (!settings) {
      settings = {
        address: 'Shri Ekvira Devi Temple, Ekvira Devi-Jaitapur-Mulher, Taluka Baglan, District Nashik, Maharashtra - 423301',
        addressMr: 'श्री एकवीरा देवी मंदिर, एकवीरा देवी-जैतापूर-मुल्हेर, तालुका बागलाण, जिल्हा नाशिक, महाराष्ट्र - ४२३३०१',
        email: 'info@kuldaivattrust.org\nsupport@kuldaivattrust.org',
        phone: '०२२-२३५१ ४७३२\n०२२-२३५१ २२३३',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119346.98938985093!2d73.93239425028592!3d20.8077304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bde5ca91223aaab%3A0x2cdf1657f77d4179!2sEkvira%20Devi-Jaitapur-Mulher!5e0!3m2!1sen!2sin!4v1778580926526!5m2!1sen!2sin',
      };
    }
    
    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await getDataFromToken();
    if (!user || !hasAdminAccess(user)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await req.json();
    let settings = await ContactSetting.findOne();

    if (settings) {
      Object.assign(settings, body);
      await settings.save();
    } else {
      settings = await ContactSetting.create(body);
    }

    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
