import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import Navbar from "@/components/Navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/test-login"); // temporary login page
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
