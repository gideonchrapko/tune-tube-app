import { signIn, signOut } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Signin with Google
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
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        SignOut
      </button>
    </form>
  );
}
