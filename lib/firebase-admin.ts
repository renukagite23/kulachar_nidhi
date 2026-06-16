import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const initFirebase = () => {
    if (!getApps().length) {
        try {
            let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';

            // Sometimes Next.js native dotenv leaves literal quotes at the very edges or escapes them
            privateKey = privateKey.replace(/^["']|["']$/g, "");

            // If the string contains explicit backslash-N, unescape it.
            if (privateKey.includes('\\n')) {
                privateKey = privateKey.replace(/\\n/g, '\n');
            }

            // We must ensure there is precisely a newline after BEGIN and before END
            // Sometimes formatting strips them. Let's force proper formatting manually.
            privateKey = privateKey.replace(/-----BEGIN PRIVATE KEY-----/g, '-----BEGIN PRIVATE KEY-----\n');
            privateKey = privateKey.replace(/-----END PRIVATE KEY-----/g, '\n-----END PRIVATE KEY-----\n');

            // Clean up any double-newlines we just accidentally created
            privateKey = privateKey.replace(/\n\n/g, '\n');

            initializeApp({
                credential: cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: privateKey,
                }),
            });
            console.log('Firebase Admin initialized successfully');
        } catch (error) {
            console.error('Firebase Admin initialization error:', error);
        }
    }
};

initFirebase();

export const getSafeMessaging = () => {
    return getApps().length > 0 ? getMessaging() : null;
};
