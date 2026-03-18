"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const steps = [
    { id: "work-permits", label: "Work Permit", path: "/form/work-permits" },
    { id: "jsa", label: "JSA", path: "/form/jsa" },
    { id: "hirarc", label: "HIRARC", path: "/form/hirarc" },
    { id: "sop", label: "SOP", path: "/form/sop" },
    {
      id: "instruksi-kerja",
      label: "Instruksi Kerja",
      path: "/form/instruksi-kerja",
    },
  ];

  // Cari urutan (index) dari halaman yang sedang aktif
  const currentIndex = steps.findIndex((step) =>
    pathname.startsWith(step.path),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* --- KOMPONEN TRACKER ALA SHOPEE --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-8 border-b pb-4">
            Status Pengisian Dokumen Ekstrama
          </h2>

          <div className="relative flex justify-between items-center w-full">
            {/* Garis background abu-abu statis */}
            <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-0"></div>

            {/* Garis progress berwarna hijau yang memanjang sesuai step */}
            <div
              className="absolute top-5 left-0 h-1 bg-emerald-500 transition-all duration-500 ease-in-out -z-0"
              style={{
                width:
                  currentIndex >= 0
                    ? `${(currentIndex / (steps.length - 1)) * 100}%`
                    : "0%",
              }}
            ></div>

            {/* Render Lingkaran Step */}
            {steps.map((step, index) => {
              // Logika status
              const isCompleted = index < currentIndex;
              const isActive = index === currentIndex;
              const isPending = index > currentIndex;

              return (
                <div
                  key={step.id}
                  className="relative z-10 flex flex-col items-center group w-1/5"
                >
                  <Link
                    href={step.path}
                    className="flex flex-col items-center focus:outline-none"
                  >
                    {/* Lingkaran Indikator */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-white
                        ${isCompleted ? "border-emerald-500 bg-emerald-500 text-white" : ""}
                        ${isActive ? "border-emerald-500 text-emerald-600 ring-4 ring-emerald-50" : ""}
                        ${isPending ? "border-gray-300 text-gray-400" : ""}
                      `}
                    >
                      {isCompleted ? (
                        // Ikon Centang jika step sudah terlewati
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      ) : (
                        // Angka jika step sedang aktif atau belum
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>

                    {/* Teks Label di bawah lingkaran */}
                    <div className="mt-3 text-center">
                      <span
                        className={`text-xs md:text-sm font-medium transition-colors duration-300
                        ${isCompleted ? "text-emerald-600" : ""}
                        ${isActive ? "text-emerald-700 font-bold" : ""}
                        ${isPending ? "text-gray-400" : ""}
                      `}
                      >
                        {step.label}
                      </span>

                      {/* Sub-teks animasi untuk yang sedang aktif */}
                      {isActive && (
                        <p className="text-[10px] md:text-xs text-emerald-500 mt-1 animate-pulse">
                          Sedang Diisi
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- AREA KONTEN HALAMAN (CHILDREN) --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
