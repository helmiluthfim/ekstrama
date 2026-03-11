"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

// Interface tetap sama
interface IWorkPermit {
  _id?: string;
  penanggungJawabTeknik: string;
  tenagaAhliK3: string;
  jenisPekerjaan: string;
  lokasi: string;
  startAt: string;
  endAt: string;
  klasifikasiPekerjaan: {
    bertegangan_listrik: boolean;
    // ... (property lain disembunyikan agar ringkas, tetap gunakan kode asli Anda)
    sipil: boolean;
  };
  prosedur: {
    pemeliharaan_fuse_cut_out: boolean;
    // ...
    prosedur_lainnya_pekerjaan_penggantian_app_1_pasha_prabayar_dan_pascabayar: boolean;
  };
  lampiran: {
    hirarc: boolean;
    job_safety_analysis: boolean;
    prosedur_kerja: boolean;
    instruksi_kerja: boolean;
  };
  status?: "pending" | "approved" | "rejected";
  approver?: string;
  approvedAt?: string;
}

export default function TableList() {
  const [workPermits, setWorkPermits] = useState<IWorkPermit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkPermit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/work-permit");
      const result = await res.json();

      if (Array.isArray(result)) {
        setWorkPermits(result);
      } else if (result.data && Array.isArray(result.data)) {
        setWorkPermits(result.data);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkPermit();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    // 1. overflow-x-auto ditambahkan agar scroll horizontal HANYA di dalam div ini
    // 2. w-full memastikan div mengambil seluruh lebar container
    <div className="w-full overflow-x-auto border rounded-md">
      {/* 3. min-w-max memastikan tabel tidak menyusut dan tetap rata kiri */}
      <Table className="w-full min-w-max text-left">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>PJ Teknik</TableHead>
            <TableHead>Tenaga Ahli K3</TableHead>
            <TableHead>Jenis Pekerjaan</TableHead>
            <TableHead>Mulai</TableHead>
            <TableHead>Selesai</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              {/* Diubah menjadi 7 sesuai jumlah kolom */}
              <TableCell colSpan={7} className="h-24 text-center">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : workPermits.length > 0 ? (
            workPermits.map((item, index) => (
              <TableRow key={item._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {item.penanggungJawabTeknik}
                </TableCell>
                <TableCell>{item.tenagaAhliK3}</TableCell>
                <TableCell>{item.jenisPekerjaan}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(item.startAt)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatDate(item.endAt)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                      item.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : item.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status || "Pending"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              {/* Diubah menjadi 7 sesuai jumlah kolom */}
              <TableCell colSpan={7} className="h-24 text-center">
                Data masih kosong.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
