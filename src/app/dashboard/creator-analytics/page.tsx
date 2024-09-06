import { SignOut } from "@/components/sign-in";
import AnalyticsPage from "@/components/db-analytics";

export default async function Analytics() {
  return (
    <div>
      <SignOut />
      <AnalyticsPage />
    </div>
  );
}
