import { getBooking, getSettings } from '@/app/_lib/data-service';
import { updateReservationAction } from '@/app/_lib/action';
import SubmitButton from './SubmitButton';

export default async function Page({ params }) {
  const { reservationId } = await params;
  const updateReservation = updateReservationAction.bind(null, reservationId);
  const [{ numGuests, observations }, { maxGuestsPerBooking: maxCapacitoy }] =
    await Promise.all([getBooking(reservationId), getSettings()]);

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
        action={updateReservation}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests? {numGuests}</label>
          <select
            name="numGuests"
            defaultValue={numGuests}
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
            defaultValue={observations}
            name="observations"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update Reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
