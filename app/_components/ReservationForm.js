'use client';
import useReservation from '@/app/_components/ReservationContext';
import { differenceInDays } from 'date-fns';
import { createReservationAction } from '@/app/_lib/action';
import SubmitButton from '@/app/account/reservations/edit/[reservationId]/SubmitButton';

function ReservationForm({ cabin, user }) {
  const { range } = useReservation();

  const { maxCapacitoy, regularPrice, discount } = cabin;

  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = (regularPrice - discount) * numNights;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: cabin.id,
    guestId: user.id,
  };

  const createFunc = createReservationAction.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 flex items-center justify-between px-16 py-2">
        <p>Logged in as</p>

        {
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              referrerPolicy="no-referrer"
              className="h-8 rounded-full"
              src={user.image}
              alt={user.name}
            />
            <p>{user.name}</p>
          </div>
        }
      </div>

      <form
        className="bg-primary-900 flex flex-col gap-5 px-16 py-10 text-lg"
        action={createFunc}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacitoy }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
