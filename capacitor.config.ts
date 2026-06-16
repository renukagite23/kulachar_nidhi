import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kulacharnidhi.app',
  appName: 'Kulachar Nidhi',
  webDir: 'public',
  server: {
    url: 'https://my-kulachar-nidhi.vercel.app',
    cleartext: false,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;