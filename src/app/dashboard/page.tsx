import { SignOut } from "@/components/sign-in";
import DashboardHome from "@/components/db-home";

export default async function DashboardPage() {
  return (
    <div>
      <SignOut />
      <DashboardHome />
    </div>
  );
}
