'use server';

import { auth, signIn, signOut } from './auth';
import { supabase } from '@/app/_lib/supabase';
import { revalidatePath } from 'next/cache';
import { getBookings } from '@/app/_lib/data-service';
import { redirect } from 'next/navigation';
export async function signInAction() {
  await signIn('github', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) {
    throw new Error('Session not found');
  }
  const [nationality, countryFlag] = formData.get('nationality').split('%');
  const nationalID = formData.get('nationalID');

  if (!/^[0-9]{6}$/.test(nationalID)) {
    throw new Error('Invalid National ID');
  }
  const updateData = { nationality, nationalID, countryFlag };

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) {
    throw new Error('Guest could not be updated');
  }
  revalidatePath('/account/profile');
  return data;
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) {
    throw new Error('Session not found');
  }

  const guestBookings = await getBookings(session.user.guestId);
  if (!guestBookings.some((booking) => booking.id === bookingId)) {
    throw new Error('Booking not found');
  }

  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  revalidatePath('/account/reservations');
  return data;
}

export async function updateReservationAction(reservationId, formData) {
  const session = await auth();
  if (!session) {
    throw new Error('Session not found');
  }

  const updateData = {
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations'),
  };

  const { data, error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', reservationId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath(`/account/reservations/edit/${reservationId}`);

  redirect('/account/reservations');
  return data;
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth();
  if (!session) {
    throw new Error('Session not found');
  }
  const createData = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get('numGuests')),
    observations: formData.get('observations'),
    extrasPrice: 0,
    totalPrice: Number(formData.get('totalPrice')),
    isPaid: false,
    status: 'unconfirmed',
  };

  console.log(createData);

  const { data, error } = await supabase.from('bookings').insert([createData]);
  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect('/thankyou');
}
