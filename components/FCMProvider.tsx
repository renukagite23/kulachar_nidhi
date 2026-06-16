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

                    // 4. Send token to your backend
                    PushNotifications.addListener('registration', async (capacitorToken) => {
                        console.log('Firebase Token obtained natively:', capacitorToken.value);

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

                    // 5. Handle Foreground Notifications (App is OPEN)
                    PushNotifications.addListener('pushNotificationReceived', (notification) => {
                        console.log('Push received while app in foreground:', notification);
                        // Optional: Show an in-app alert or custom UI since Android won't show it in tray
                        // alert(`${notification.title}\n\n${notification.body}`);
                    });

                    // 6. Handle notification click (User taps the notification in tray)
                    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
                        console.log('Push action performed:', notification);
                        // You can navigate to a specific page here based on notification.data
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

        // Cleanup listeners on unmount
        return () => {
            if (Capacitor.isNativePlatform()) {
                PushNotifications.removeAllListeners();
            }
        };
    }, [isAuthenticated, token]);

    return null; // This component doesn't render anything in the UI
}
