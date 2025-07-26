import { Josefin_Sans } from 'next/font/google';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});
import '@/app/_styles/globals.css';
import Header from '@/app/_components/Header';
import { ReservationProvider } from '@/app/_components/ReservationContext';
export const metadata = {
  title: {
    template: '%s | The Wild Oasis',
    default: 'welcome to The Wild Oasis',
  },
  description: 'Luxury cabins in the Dolomites',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} bg-primary-950 text-primary-100 flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <div className="grid flex-1 px-8 py-12">
          <main className="mx-auto w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
