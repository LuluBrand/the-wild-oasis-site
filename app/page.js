import bg from '@/public/bg.png';
import Image from 'next/image';
import Link from 'next/link';
export default function Page() {
  return (
    <main className="mt-24">
      <Image
        priority
        src={bg}
        fill
        alt="mountains and forests with two cabins"
        className="object-cover object-top"
        quality={80}
        placeholder="blur"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-primary-50 mb-10 text-8xl font-normal tracking-tight">
          welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-6 text-lg font-semibold transition-all"
        >
          explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
