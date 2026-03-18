import CardHeaderDashboard from "@/components/CardHeaderDashboard";
import TableList from "@/components/table-list";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // 1. Import komponen Link

function page() {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto flex flex-col max-w-7xl px-6 pt-8">
        <CardHeaderDashboard />

        {/* 2. Gunakan Link. Jika ini shadcn/ui, gunakan asChild pada Button */}
        <Button asChild className="w-50 mt-4 sm:w-fit">
          <Link href="/form/work-permits">+ Ajukan Izin Kerja</Link>
        </Button>

        <div className="mt-6 w-full">
          <TableList />
        </div>
      </div>
    </div>
  );
}

export default page;
