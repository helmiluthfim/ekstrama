import CardHeaderDashboard from "@/components/CardHeaderDashboard";

function page() {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto flex flex-col items-center max-w-7xl px-6 pt-8">
        <CardHeaderDashboard />
        <div className="mt-6">
          <h1>content</h1>
        </div>
      </div>
    </div>
  );
}

export default page;
