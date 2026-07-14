import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ListingsPageSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="page-enter">
        <ListingsPageSkeleton />
      </div>

      <Footer />
    </div>
  );
}
