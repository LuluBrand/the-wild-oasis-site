import { signInAction } from '@/app/_lib/action';

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="border-primary-300 flex items-center gap-6 border px-10 py-4 text-lg font-medium">
        <img
          src="https://authjs.dev/img/providers/github.svg"
          alt="Github logo"
          height="24"
          width="24"
        />
        <span>Continue with Github</span>
      </button>
    </form>
  );
}

export default SignInButton;
