// models/topic.ts
import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    penanggungJawabTeknik: { type: String, required: true },
    tenagaAhliK3: { type: String, required: true },
    jenisPekerjaan: {
      type: [String],
      enum: ["Pekerjaan Penggantian APP 1 Phasa Prabayar dan Pascabayar"],
      required: true,
    },
    klasifikasiPekerjaan: {
      type: [String],
      enum: [
        "Pekerjaan Bertegangan Listrik",
        "Pekerjaan Confined Space",
        "Pekerjaan Panas",
        "Pekerjaan di Ketinggian",
        "Pekerjaan Penggalian",
        "Pekerjaan Bahan Kimia",
        "Pekerjaan Penanaman Tiang",
        "Pekerjaan Perampalan Pohon (ROW)",
        "Pekerjaan Sipil",
      ],
      required: true,
    },
    prosedur: {
      type: [String],
      enum: [
        "Pemeliharaan Fuse Cut Out",
        "Bongkar Pasang Tarfo Portal",
        "Pemeliharaan SUTM (Perabasan)",
        "Pemeliharaan SUTM (Perbaikan Kawat Rantas)",
        "Pekerjaan Penggalian",
        "Pekerjaan Bahan Kimia",
        "Pemeliharaan LBS dan RECLOSSER",
        "Bongkar dan Pasang Tiang Beton",
        "Pemeliharaan Cubikle Gardu Bangunan",
        "Prosedur Lainnya, Pekerjaan Penggantian APP 1 Pasha Prabayar dan Pascabayar",
      ],
      required: true,
    },
    lampiran: {
      type: [String],
      enum: [
        "Identifikasi Bahaya, Penilaian dan Pengendalian Resiko (HIRARC)",
        "Job Safety Analisys",
        "Prosedur Kerja",
        "Intruksi Kerja",
      ],
      required: true,
    },
    lokasi: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
  },
  { timestamps: true },
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
