'use client';
import ReservationCard from '@/app/account/reservations/ReservationCard';
import { useOptimistic } from 'react';
import { deleteReservationAction } from '@/app/_lib/action';

export default function ReservationsList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  async function deleteReservation(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={deleteReservation}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
