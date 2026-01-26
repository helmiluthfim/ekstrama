"use client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, XCircle, LucideIcon } from "lucide-react";

const AnimatedCounter = ({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const startAnimation = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(2, -10 * percentage);

      const currentCount = Math.floor(easeOut * value);
      if (countRef.current !== currentCount) {
        setCount(currentCount);
        countRef.current = currentCount;
      }

      if (percentage < 1) {
        requestAnimationFrame(startAnimation);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(startAnimation);

    return () => {
      startTimeRef.current = null;
    };
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

interface CardItem {
  title: string;
  total: number;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

function CardHeaderDashboard() {
  const cardList: CardItem[] = [
    {
      title: "Approve",
      total: 200,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      total: 100,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      icon: Clock,
    },
    {
      title: "Reject",
      total: 20,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      icon: XCircle,
    },
  ];

  return (
    <div className="w-full px-2 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cardList.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card
              key={index}
              className={`
                relative overflow-hidden border shadow-sm transition-all duration-300
                hover:shadow-md hover:-translate-y-1 cursor-default
                bg-slate-950 dark:bg-slate-900 ${item.borderColor}
              `}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {/* Bagian Kiri: Teks */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {item.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-3xl font-bold tracking-tight ${item.color}`}
                      >
                        {/* Menggunakan komponen AnimatedCounter di sini */}
                        <AnimatedCounter value={item.total} />
                      </span>
                    </div>
                  </div>

                  {/* Bagian Kanan: Ikon */}
                  <div
                    className={`p-3 rounded-xl ${item.bgColor} ${item.color}`}
                  >
                    <Icon className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Dekorasi Background */}
                <div
                  className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 blur-2xl ${item.bgColor.replace("/10", "")}`}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default CardHeaderDashboard;
