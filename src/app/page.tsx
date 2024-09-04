import { auth } from "@/auth";
import HomePage from "@/components/home-page";

export default async function Home() {
  const session = await auth();

  return <HomePage session={session} />;
}
