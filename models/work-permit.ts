import mongoose, { Document, Schema } from "mongoose";

export interface IWorkPermit extends Document {
  penanggungJawabTeknik: string;
  tenagaAhliK3: string;
  jenisPekerjaan: string;
  lokasi: string;
  startAt: Date;
  endAt: Date;
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
  status: string;
  approver?: string | null;
  approvedAt?: Date | null;
}

const workPermitSchema = new Schema<IWorkPermit>(
  {
    penanggungJawabTeknik: { type: String, required: true },
    tenagaAhliK3: { type: String, required: true },
    jenisPekerjaan: { type: String, required: true },
    lokasi: { type: String, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },

    // Sesuaikan dengan bentuk form di frontend
    klasifikasiPekerjaan: {
      bertegangan_listrik: { type: Boolean, default: false },
      confined_space: { type: Boolean, default: false },
      panas: { type: Boolean, default: false },
      ketinggian: { type: Boolean, default: false },
      penggalian: { type: Boolean, default: false },
      bahan_kimia: { type: Boolean, default: false },
      penanaman_tiang: { type: Boolean, default: false },
      perampalan_pohon: { type: Boolean, default: false },
      sipil: { type: Boolean, default: false },
    },

    prosedur: {
      pemeliharaan_fuse_cut_out: { type: Boolean, default: false },
      bongkar_pasang_tarfo_portal: { type: Boolean, default: false },
      pemeliharaan_sutm_perabasan: { type: Boolean, default: false },
      pemeliharaan_sutm_perbaikan_kawat_rantas: {
        type: Boolean,
        default: false,
      },
      pekerjaan_penggalian: { type: Boolean, default: false },
      pekerjaan_bahan_kimia: { type: Boolean, default: false },
      pemeliharaan_lbs_dan_reclosser: { type: Boolean, default: false },
      bongkar_dan_pasang_tiang_beton: { type: Boolean, default: false },
      pemeliharaan_cubikle_gardu_bangunan: { type: Boolean, default: false },
      prosedur_lainnya_pekerjaan_penggantian_app_1_pasha_prabayar_dan_pascabayar:
        { type: Boolean, default: false },
    },

    lampiran: {
      hirarc: { type: Boolean, default: false },
      job_safety_analysis: { type: Boolean, default: false },
      prosedur_kerja: { type: Boolean, default: false },
      instruksi_kerja: { type: Boolean, default: false },
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    // Karena saat disubmit statusnya masih pending, kolom ini tidak boleh diwajibkan (required: false)
    approver: { type: String, default: null },
    approvedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

const WorkPermit =
  mongoose.models.WorkPermit ||
  mongoose.model<IWorkPermit>("WorkPermit", workPermitSchema);

export default WorkPermit;
