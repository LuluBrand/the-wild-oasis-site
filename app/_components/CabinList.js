import { unstable_noStore } from 'next/cache';
import CabinCard from '@/app/_components/CabinCard';
import { getCabins } from '@/app/_lib/data-service';

export default async function CabinList({ filter }) {
  const cabins = await getCabins();
  if (!cabins.length) return null;

  let displayCabins = cabins;

  if (filter === 'small') {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacitoy <= 3);
  }
  if (filter === 'medium') {
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacitoy > 3 && cabin.maxCapacitoy < 8,
    );
  }

  if (filter === 'large') {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacitoy >= 8);
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
