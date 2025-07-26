import { auth } from '@/app/_lib/auth';

export const metadata = {
  title: 'Account',
};
export default async function Page() {
  const session = await auth()
  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Welcome  {session.user.name}
      </h2>
    </div>
  );
}
