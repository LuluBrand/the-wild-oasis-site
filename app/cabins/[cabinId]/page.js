import {
  getCabin,
  getCabins,

} from '@/app/_lib/data-service';
import Reservation from '@/app/_components/Reservation';
import { Suspense } from 'react';
import Spinner from '@/app/_components/Spinner';
import Cabin from '@/app/_components/Cabin';

export async function generateMetadata(props) {
  const { cabinId } = await props.params;
  const cabin = await getCabin(cabinId);
  return {
    title: `Cabin ${cabin.name}`,
    description: cabin.description,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page(props) {
  const { cabinId } = await props.params;

  const cabin = await getCabin(cabinId);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-accent-400 mb-10 text-center text-5xl font-semibold">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
