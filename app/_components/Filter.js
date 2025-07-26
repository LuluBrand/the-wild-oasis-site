'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  const Button = ({ filter, handFilter, activeFilter }) => {
    return (
      <button
        onClick={handFilter}
        className={`hover:bg-primary-700 px-5 py-2 ${
          filter === activeFilter.toUpperCase() ? 'bg-primary-700' : ''
        }`}
      >
        {filter}
      </button>
    );
  };

  const handleClick = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', e);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border-primary-800 flex border">
      <Button
        filter="ALL"
        handFilter={() => handleClick('all')}
        activeFilter={activeFilter}
      ></Button>
      <Button
        filter="SMALL"
        handFilter={() => handleClick('small')}
        activeFilter={activeFilter}
      ></Button>
      <Button
        filter="MEDIUM"
        handFilter={() => handleClick('medium')}
        activeFilter={activeFilter}
      ></Button>
      <Button
        filter="LARGE"
        handFilter={() => handleClick('large')}
        activeFilter={activeFilter}
      ></Button>
    </div>
  );
}
