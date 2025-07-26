import DateSelector from '@/app/_components/DateSelector';
import ReservationForm from '@/app/_components/ReservationForm';
import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import { auth } from '@/app/_lib/auth';
import LoginMessage from '@/app/_components/LoginMessage';

export default async function Reservation({ cabin }) {
  const session = await auth();

  console.log(session);

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="border-primary-800 grid min-h-[400px] grid-cols-2 border">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
