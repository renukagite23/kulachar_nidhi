import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import ReduxProvider from '@/redux/provider';


export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}