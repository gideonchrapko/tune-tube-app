import { signIn, signOut } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className="absolute top-5 right-5 px-[30px] py-[10px] bg-black text-white text-sm font-bold cursor-pointer uppercase tracking-[2px] border-none rounded-full transition-transform duration-300 ease-in-out hover:transform hover:scale-105">
        Sign In with Google
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="absolute top-5 right-5 px-[30px] py-[10px] bg-black text-white text-sm font-bold cursor-pointer uppercase tracking-[2px] border-none rounded-full transition-transform duration-300 ease-in-out hover:transform hover:scale-105">
        Sign Out
      </button>
    </form>
  );
}
