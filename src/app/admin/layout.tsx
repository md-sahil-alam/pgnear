import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

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
      {children}
      <a
        href="/admin/listings/new"
        className="bg-blue-500 text-white px-4 py-2 rounded">
        + Add Listing
      </a>
    </div>
  );
}
