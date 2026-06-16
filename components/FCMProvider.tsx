'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Adjust import if needed

import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

export default function FCMProvider() {
    const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const setupNotifications = async () => {
            if (!isAuthenticated || typeof window === 'undefined') return;

            // Only attempt native push setup if we are on a native device (Android/iOS)
            if (Capacitor.isNativePlatform()) {
                try {
                    // 1. Check and Request Permission (Triggers the Android 13+ popup)
                    let permStatus = await PushNotifications.checkPermissions();

                    if (permStatus.receive === 'prompt') {
                        permStatus = await PushNotifications.requestPermissions();
                    }

                    if (permStatus.receive !== 'granted') {
                        console.log('User denied native push notification permissions');
                        return;
                    }

                    // 2. Register for Push Notifications
                    // On success, this will fire the 'registration' event below
                    await PushNotifications.register();

                    // 3. Listen for the registration token to be assigned by Firebase
                    PushNotifications.addListener('registration', async (capacitorToken) => {
                        console.log('Firebase Token obtained natively:', capacitorToken.value);

                        // 4. Send token to your backend
                        try {
                            const res = await fetch('/api/user/fcm-token', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ token: capacitorToken.value }),
                            });

                            if (res.ok) console.log('FCM Token registered successfully to backend MongoDB');
                        } catch (err) {
                            console.error('Failed to post native token to backend', err);
                        }
                    });

                    // Utility listener for any registration errors natively
                    PushNotifications.addListener('registrationError', (error: any) => {
                        console.error('Error on native registration: ' + JSON.stringify(error));
                    });

                } catch (error) {
                    console.error('Error setting up Native Push:', error);
                }
            } else {
                console.log('Web environment detected, skipping native PushNotifications setup.');
            }
        };

        setupNotifications();
    }, [isAuthenticated, token]);

    return null; // This component doesn't render anything in the UI
}
