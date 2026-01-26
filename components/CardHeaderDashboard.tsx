import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, XCircle } from "lucide-react"; // Opsional: Tambah icon agar lebih pro

interface CardItem {
  title: string;
  total: number;
  color: string;
  bgColor: string;
  icon: any;
}

function CardHeaderDashboard() {
  const cardList: CardItem[] = [
    {
      title: "Approve",
      total: 192,
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      total: 100,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      icon: Clock,
    },
    {
      title: "Reject",
      total: 20,
      color: "text-red-600",
      bgColor: "bg-red-50",
      icon: XCircle,
    },
  ];

  return (
    <div className="w-full px-2">
      <div className="grid grid-cols-3 gap-2 md:gap-4 ">
        {cardList.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden border-none shadow-sm bg-slate-50/50"
          >
            <CardContent className="py-2 md:py-4 flex flex-col items-center justify-center text-center">
              <div
                className={`text-base md:text-3xl font-bold tracking-tighter ${item.color}`}
              >
                {item.total.toLocaleString()}
              </div>

              <p className="text-[10px] mt-2 md:mt-4 md:text-sm font-medium text-muted-foreground uppercase tracking-tight mb-1">
                {item.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CardHeaderDashboard;
