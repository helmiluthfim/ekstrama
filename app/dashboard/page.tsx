import CardHeaderDashboard from "@/components/CardHeaderDashboard";
import TableList from "@/components/table-list";

function page() {
  return (
    <div className="min-h-screen w-full">
      {/* 1. Hapus 'items-center' agar elemen di dalamnya bisa merentang penuh (stretch) */}
      <div className="mx-auto flex flex-col max-w-7xl px-6 pt-8">
        <CardHeaderDashboard />

        {/* 2. Tambahkan 'w-full' agar div ini mengambil 100% lebar dari max-w-7xl */}
        <div className="mt-6 w-full">
          <TableList />
        </div>
      </div>
    </div>
  );
}

export default page;
