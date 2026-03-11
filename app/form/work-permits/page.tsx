"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IWorkPermit {
  penanggungJawabTeknik: string;
  tenagaAhliK3: string;
  jenisPekerjaan: string;
  lokasi: string;
  startAt: string;
  endAt: string;
  klasifikasiPekerjaan: {
    bertegangan_listrik: boolean;
    confined_space: boolean;
    panas: boolean;
    ketinggian: boolean;
    penggalian: boolean;
    bahan_kimia: boolean;
    penanaman_tiang: boolean;
    perampalan_pohon: boolean;
    sipil: boolean;
  };
  prosedur: {
    pemeliharaan_fuse_cut_out: boolean;
    bongkar_pasang_tarfo_portal: boolean;
    pemeliharaan_sutm_perabasan: boolean;
    pemeliharaan_sutm_perbaikan_kawat_rantas: boolean;
    pekerjaan_penggalian: boolean;
    pekerjaan_bahan_kimia: boolean;
    pemeliharaan_lbs_dan_reclosser: boolean;
    bongkar_dan_pasang_tiang_beton: boolean;
    pemeliharaan_cubikle_gardu_bangunan: boolean;
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

export default function Page() {
  const getCurrentTime = (offsetHours = 0) => {
    const now = new Date();
    now.setHours(now.getHours() + offsetHours);
    return format(now, "HH:mm");
  };

  const [startTime, setStartTime] = useState(getCurrentTime(0));
  const [endTime, setEndTime] = useState(getCurrentTime(1));
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  // State khusus untuk error kustom (Waktu & Checkbox)
  const [dateError, setDateError] = useState("");
  const [klasifikasiError, setKlasifikasiError] = useState("");
  const [prosedurError, setProsedurError] = useState("");
  const [lampiranError, setLampiranError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }, // Ambil state errors dari useForm
  } = useForm<IWorkPermit>({
    defaultValues: {
      klasifikasiPekerjaan: {
        bertegangan_listrik: false,
        confined_space: false,
        panas: false,
        ketinggian: false,
        penggalian: false,
        bahan_kimia: false,
        penanaman_tiang: false,
        perampalan_pohon: false,
        sipil: false,
      },
      prosedur: {
        pemeliharaan_fuse_cut_out: false,
        bongkar_pasang_tarfo_portal: false,
        pemeliharaan_sutm_perabasan: false,
        pemeliharaan_sutm_perbaikan_kawat_rantas: false,
        pekerjaan_penggalian: false,
        pekerjaan_bahan_kimia: false,
        pemeliharaan_lbs_dan_reclosser: false,
        bongkar_dan_pasang_tiang_beton: false,
        pemeliharaan_cubikle_gardu_bangunan: false,
        prosedur_lainnya_pekerjaan_penggantian_app_1_pasha_prabayar_dan_pascabayar: false,
      },
      lampiran: {
        hirarc: false,
        job_safety_analysis: false,
        prosedur_kerja: false,
        instruksi_kerja: false,
      },
    },
  });

  const onSubmit: SubmitHandler<IWorkPermit> = async (data) => {
    try {
      // Reset semua error kustom di awal pengecekan
      setDateError("");
      setKlasifikasiError("");
      setProsedurError("");
      setLampiranError("");

      let hasCustomError = false;

      // --- VALIDASI MINIMAL 1 CHECKLIST ---
      const hasKlasifikasi = Object.values(data.klasifikasiPekerjaan).some(
        Boolean,
      );
      if (!hasKlasifikasi) {
        setKlasifikasiError("Harap pilih minimal satu Klasifikasi Pekerjaan!");
        hasCustomError = true;
      }

      const hasProsedur = Object.values(data.prosedur).some(Boolean);
      if (!hasProsedur) {
        setProsedurError("Harap pilih minimal satu Prosedur Pekerjaan!");
        hasCustomError = true;
      }

      const hasLampiran = Object.values(data.lampiran).some(Boolean);
      if (!hasLampiran) {
        setLampiranError("Harap pilih minimal satu Lampiran Izin Kerja!");
        hasCustomError = true;
      }

      // --- VALIDASI TANGGAL DAN WAKTU ---
      const startDateStr = date?.from ? format(date.from, "yyyy-MM-dd") : "";
      const endDateStr = date?.to
        ? format(date.to, "yyyy-MM-dd")
        : startDateStr;

      if (!startDateStr) {
        setDateError("Harap pilih tanggal mulai pekerjaan!");
        hasCustomError = true;
      }

      const startDateTimeObj = new Date(`${startDateStr}T${startTime}:00`);
      const endDateTimeObj = new Date(`${endDateStr}T${endTime}:00`);

      if (endDateTimeObj <= startDateTimeObj) {
        setDateError(
          "Waktu selesai pekerjaan harus lebih akhir dari waktu mulai!",
        );
        hasCustomError = true;
      }

      // Jika ada error kustom, hentikan proses submit
      if (hasCustomError) return;

      const formattedStartAt = `${startDateStr}T${startTime}:00`;
      const formattedEndAt = `${endDateStr}T${endTime}:00`;

      const payload = {
        ...data,
        startAt: formattedStartAt,
        endAt: formattedEndAt,
        status: "pending",
        approver: null,
        approvedAt: null,
      };

      const res = await fetch("/api/work-permit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success || res.ok) {
        alert("Data berhasil disimpan!");
        setDate({ from: new Date(), to: new Date() });
        setStartTime(getCurrentTime(0));
        setEndTime(getCurrentTime(1));
        reset();
      } else {
        alert("Gagal menyimpan data: " + (result.error || "Gagal"));
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-lg p-4"
    >
      <FieldGroup>
        {/* Penanggung Jawab Teknik */}
        <Field>
          <FieldLabel>
            Penanggung Jawab Teknik <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            {...register("penanggungJawabTeknik", {
              required: "Penanggung Jawab Teknik wajib diisi",
            })}
            placeholder="Masukan Nama Penanggung Jawab Teknik"
            className={errors.penanggungJawabTeknik ? "border-red-500" : ""}
          />
          {errors.penanggungJawabTeknik && (
            <p className="text-sm text-red-500 mt-1">
              {errors.penanggungJawabTeknik.message}
            </p>
          )}
        </Field>

        {/* Tenaga Ahli K3 */}
        <Field>
          <FieldLabel>
            Pilih Tenaga Ahli K3 <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="tenagaAhliK3"
            control={control}
            rules={{ required: "Tenaga Ahli K3 wajib dipilih" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={errors.tenagaAhliK3 ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Pilih Tenaga Ahli K3" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Adynata Kumara">Adynata Kumara</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.tenagaAhliK3 && (
            <p className="text-sm text-red-500 mt-1">
              {errors.tenagaAhliK3.message}
            </p>
          )}
        </Field>

        {/* Lokasi */}
        <Field>
          <FieldLabel>
            Pilih Lokasi ULP <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="lokasi"
            control={control}
            rules={{ required: "Lokasi ULP wajib dipilih" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={errors.lokasi ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Pilih Lokasi ULP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PT PLN (Persero) UID Lampung UP3 Metro ULP Sukadana">
                    PT PLN (Persero) UID Lampung UP3 Metro ULP Sukadana
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.lokasi && (
            <p className="text-sm text-red-500 mt-1">{errors.lokasi.message}</p>
          )}
        </Field>

        {/* Waktu Izin Kerja */}
        <Field>
          <FieldLabel>
            Durasi Izin Kerja <span className="text-red-500">*</span>
          </FieldLabel>
          <Field orientation="horizontal">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-range"
                  className={`justify-start px-2.5 font-normal ${dateError ? "border-red-500" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    if (dateError) setDateError(""); // Hilangkan error jika diubah
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Field className="w-32">
              <Input
                type="time"
                id="time-start"
                required
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  if (dateError) setDateError("");
                }}
                className={`appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${dateError ? "border-red-500" : ""}`}
              />
            </Field>
            -
            <Field className="w-32">
              <Input
                type="time"
                id="time-end"
                required
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  if (dateError) setDateError("");
                }}
                className={`appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none ${dateError ? "border-red-500" : ""}`}
              />
            </Field>
          </Field>
          {dateError && (
            <p className="text-sm text-red-500 mt-1">{dateError}</p>
          )}
        </Field>

        {/* Jenis Pekerjaan */}
        <Field>
          <FieldLabel>
            Jenis Pekerjaan <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="jenisPekerjaan"
            control={control}
            rules={{ required: "Jenis Pekerjaan wajib dipilih" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={errors.jenisPekerjaan ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Pilih Jenis Pekerjaan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pekerjaan Penggantian APP 1 Phasa">
                    Pekerjaan Penggantian APP 1 Phasa
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.jenisPekerjaan && (
            <p className="text-sm text-red-500 mt-1">
              {errors.jenisPekerjaan.message}
            </p>
          )}
        </Field>

        {/* Klasifikasi Pekerjaan */}
        <FieldGroup>
          <FieldLabel className="font-bold mt-2">
            Klasifikasi Pekerjaan{" "}
            <span className="text-red-500 text-sm font-normal">
              *minimal pilih 1
            </span>
          </FieldLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              {
                name: "bertegangan_listrik",
                label: "Pekerjaan Bertegangan Listrik",
              },
              { name: "confined_space", label: "Pekerjaan Confined Space" },
              { name: "panas", label: "Pekerjaan Panas" },
              { name: "ketinggian", label: "Pekerjaan di Ketinggian" },
              { name: "penggalian", label: "Pekerjaan Penggalian" },
              { name: "bahan_kimia", label: "Pekerjaan Bahan Kimia" },
              { name: "penanaman_tiang", label: "Pekerjaan Penanaman Tiang" },
              { name: "perampalan_pohon", label: "Pekerjaan Perampalan Pohon" },
              { name: "sipil", label: "Pekerjaan Sipil" },
            ].map((item) => (
              <Field key={item.name} orientation="horizontal">
                <Controller
                  name={`klasifikasiPekerjaan.${item.name}` as any}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (klasifikasiError) setKlasifikasiError("");
                        }}
                      />
                      <Label>{item.label}</Label>
                    </div>
                  )}
                />
              </Field>
            ))}
          </div>
          {klasifikasiError && (
            <p className="text-sm text-red-500 mt-1">{klasifikasiError}</p>
          )}
        </FieldGroup>

        {/* Prosedur Pekerjaan */}
        <FieldGroup>
          <FieldLabel className="font-bold mt-2">
            Prosedur Pekerjaan Yang Telah Dijelaskan Kepada Pekerja{" "}
            <span className="text-red-500 text-sm font-normal">
              *minimal pilih 1
            </span>
          </FieldLabel>
          <div className="flex flex-col gap-2">
            {[
              {
                name: "pemeliharaan_fuse_cut_out",
                label: "Pemeliharaan Fuse Cut Out",
              },
              {
                name: "bongkar_pasang_tarfo_portal",
                label: "Bongkar Pasang Trafo Portal",
              },
              {
                name: "pemeliharaan_sutm_perabasan",
                label: "Pemeliharaan SUTM Perabasan",
              },
              {
                name: "pemeliharaan_sutm_perbaikan_kawat_rantas",
                label: "Pemeliharaan SUTM Perbaikan Kawat Rantas",
              },
              { name: "pekerjaan_penggalian", label: "Pekerjaan Penggalian" },
              { name: "pekerjaan_bahan_kimia", label: "Pekerjaan Bahan Kimia" },
              {
                name: "pemeliharaan_lbs_dan_reclosser",
                label: "Pemeliharaan LBS dan Reclosser",
              },
              {
                name: "bongkar_dan_pasang_tiang_beton",
                label: "Bongkar dan Pasang Tiang Beton",
              },
              {
                name: "pemeliharaan_cubikle_gardu_bangunan",
                label: "Pemeliharaan Cubicle Gardu Bangunan",
              },
              {
                name: "prosedur_lainnya_pekerjaan_penggantian_app_1_pasha_prabayar_dan_pascabayar",
                label:
                  "Prosedur Lainnya: Pekerjaan Penggantian APP 1 Phase Prabayar & Pascabayar",
              },
            ].map((item) => (
              <Field key={item.name} orientation="horizontal">
                <Controller
                  name={`prosedur.${item.name}` as any}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (prosedurError) setProsedurError("");
                        }}
                      />
                      <Label>{item.label}</Label>
                    </div>
                  )}
                />
              </Field>
            ))}
          </div>
          {prosedurError && (
            <p className="text-sm text-red-500 mt-1">{prosedurError}</p>
          )}
        </FieldGroup>

        {/* Lampiran */}
        <FieldGroup>
          <FieldLabel className="font-bold mt-2">
            Lampiran Izin Kerja{" "}
            <span className="text-red-500 text-sm font-normal">
              *minimal pilih 1
            </span>
          </FieldLabel>
          <div className="flex flex-col gap-2">
            {[
              {
                name: "hirarc",
                label:
                  "Identifikasi Bahaya, Penilaian dan Pengendalian Resiko (HIRARC)",
              },
              { name: "job_safety_analysis", label: "Job Safety Analysis" },
              { name: "prosedur_kerja", label: "Prosedur Kerja" },
              { name: "instruksi_kerja", label: "Instruksi Kerja" },
            ].map((item) => (
              <Field key={item.name} orientation="horizontal">
                <Controller
                  name={`lampiran.${item.name}` as any}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (lampiranError) setLampiranError("");
                        }}
                      />
                      <Label>{item.label}</Label>
                    </div>
                  )}
                />
              </Field>
            ))}
          </div>
          {lampiranError && (
            <p className="text-sm text-red-500 mt-1">{lampiranError}</p>
          )}
        </FieldGroup>
      </FieldGroup>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Simpan
      </button>
    </form>
  );
}
