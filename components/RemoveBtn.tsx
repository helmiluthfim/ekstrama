// components/RemoveBtn.tsx
"use client";

import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }: { id: string }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      }); // Catatan: perbaiki path endpoint agar sesuai dengan dynamic route

      // PERBAIKAN: Gunakan endpoint dynamic yang benar
      const resCorrect = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
      });

      if (resCorrect.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      Delete
    </button>
  );
}
