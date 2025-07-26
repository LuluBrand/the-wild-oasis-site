export default function page() {
  return (
    <main classname="mt-24">
      <img src="/bg.png" alt="mountains and forests with two cabins" />

      <div classname="relative z-10 text-center">
        <h1 classname="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          welcome to paradise.
        </h1>
        <a
          href="/cabins"
          classname="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          explore luxury cabins
        </a>
      </div>
    </main>
  );
}
