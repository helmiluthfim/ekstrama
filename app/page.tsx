import Cards from "@/components/Cards";

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="font-light text-[14px]">Aktivitas Terkini</p>
      <Cards />
    </div>
  );
}
