import React from "react";

type Item = {
  title: string;
  acccount: number;
  icon: string;
};

function Cards() {
  const items: Item[] = [
    {
      title: "Total Izin Kerja",
      acccount: 156,
      icon: "🧾",
    },
    {
      title: "Total Izin Selesai",
      acccount: 120,
      icon: "✅",
    },
    {
      title: "Total Pending",
      acccount: 24,
      icon: "⏳",
    },
    {
      title: "Total Ditolak",
      acccount: 12,
      icon: "❌",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-xl p-4 flex flex-col items-center justify-center text-center border"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <h3 className="text-sm font-medium text-gray-600">{item.title}</h3>
          <p className="text-2xl font-semibold text-gray-800">
            {item.acccount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Cards;
