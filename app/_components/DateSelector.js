'use client';
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';
import useReservation from '@/app/_components/ReservationContext';

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, resetRange, setRange } = useReservation();
  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(range.to, range.from);

  const cabinPrice = regularPrice * numNights;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-6"
        mode="range"
        startMonth={new Date()}
        selected={range}
        endMonth={new Date()}
        min={minBookingLength}
        onSelect={setRange}
        max={maxBookingLength}
        captionLayout="dropdown"
        disabled={(curDate) =>
          isPast(curDate)
        }
      />

      <div className="bg-accent-500 text-primary-800 flex h-[72px] items-center justify-between px-8">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="text-primary-700 font-semibold line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border-primary-800 border px-4 py-2 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
