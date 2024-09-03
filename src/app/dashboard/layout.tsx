import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session)
    return (
      <div className="h-screen">
        Please sign in to view this dashboard <SignIn />
      </div>
    );

  return <div className="h-screen">{children}</div>;
}
