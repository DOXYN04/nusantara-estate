/* ==========================================================================
   LOGIKA INTERAKTIF SIMULASI CICILAN KPR & ERROR HANDLING
   ========================================================================== */

/* Konstanta Data Finansial Unit Properti Terkini */
const dataUnitKPR = {
  36: {
    harga: 166000000,
    minDP: 13000000,
    bunga: 0.05,
    labelBunga: "5.0% Fixed (Subsidi)",
  },
  /* PAS: Mengubah database harga Tipe 55 menjadi Rp 250.000.000 untuk kalkulasi presisi */
  55: {
    harga: 250000000,
    minDP: 24000000,
    bunga: 0.11,
    labelBunga: "11.0% Fixed Anuitas (Komersil)",
  },
};

/* Mengubah Angka Numerik Murni Menjadi String Berformat Rupiah */
function formatKeMataUangRupiah(angka) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(angka);
}

/* Mengubah String Berformat Rupiah Kembali Menjadi Angka Numerik Murni */
function bersihkanFormatKeAngka(stringRupiah) {
  return parseInt(stringRupiah.replace(/[^0-9]/g, "")) || 0;
}

/* Handler Otomatis Saat User Mengetik Nominal DP di Kolom Input */
function formatInputKeRupiah(inputElement) {
  let nilaiAwal = inputElement.value;
  let angkaMurni = bersihkanFormatKeAngka(nilaiAwal);

  if (angkaMurni === 0) {
    inputElement.value = "";
    return;
  }

  inputElement.value = formatKeMataUangRupiah(angkaMurni);
}

/* Sinkronisasi Nilai Default Saat Pilihan Tipe Rumah Diubah */
function sesuaikanDataUnit() {
  const tipeElement = document.getElementById("tipe-rumah");
  const hargaElement = document.getElementById("harga-tampil");
  const dpElement = document.getElementById("input-dp");
  const bungaElement = document.getElementById("hasil-bunga");
  const errorBox = document.getElementById("error-dp-message");

  if (tipeElement && dataUnitKPR[tipeElement.value]) {
    const tipe = tipeElement.value;
    const unit = dataUnitKPR[tipe];

    if (hargaElement) hargaElement.value = formatKeMataUangRupiah(unit.harga);
    if (dpElement) dpElement.value = formatKeMataUangRupiah(unit.minDP);
    if (bungaElement) bungaElement.innerText = unit.labelBunga;
    if (errorBox) errorBox.classList.add("hidden");

    hitungSimulasiKPR();
  }
}

/* Inti Perhitungan Finansial KPR dengan Validasi Error Handling */
function hitungSimulasiKPR() {
  const tipeElement = document.getElementById("tipe-rumah");
  const dpElement = document.getElementById("input-dp");
  const tenorElement = document.getElementById("input-tenor");
  const errorBox = document.getElementById("error-dp-message");
  const angsuranBox = document.getElementById("hasil-angsuran");
  const pokokBox = document.getElementById("hasil-pokok");

  if (!tipeElement || !dpElement || !tenorElement) return;

  const tipe = tipeElement.value;
  const unit = dataUnitKPR[tipe];
  const harga = unit.harga;
  const dpAktif = bersihkanFormatKeAngka(dpElement.value);
  const tenorTahun = parseInt(tenorElement.value);
  const totalBulan = tenorTahun * 12;

  /* Evaluasi Logika Kondisi Jika Input DP di Bawah Syarat Minimum */
  if (dpAktif < unit.minDP) {
    if (errorBox) {
      if (tipe === "36") {
        errorBox.innerText = "Mohon Isi DP Rp 13.000.000 atau lebih";
      } else {
        errorBox.innerText = "Mohon Isi DP Rp 24.000.000 atau lebih";
      }
      errorBox.classList.remove("hidden");
    }

    // Ubah tampilan output menjadi tanda strip "-" jika melanggar aturan minimum
    if (angsuranBox) angsuranBox.innerText = "-";
    if (pokokBox) pokokBox.innerText = "-";
  } else {
    if (errorBox) errorBox.classList.add("hidden");
    prosesKalkulasiFinansial(harga - dpAktif, unit.bunga, totalBulan);
  }
}

/* Memproses Rumus PMT Pembiayaan Berdasarkan Parameter Hasil Validasi */
function prosesKalkulasiFinansial(pokokPinjaman, bungaTahunan, totalBulan) {
  const angsuranBox = document.getElementById("hasil-angsuran");
  const pokokBox = document.getElementById("hasil-pokok");

  if (pokokPinjaman < 0) pokokPinjaman = 0;
  if (pokokBox) pokokBox.innerText = formatKeMataUangRupiah(pokokPinjaman);

  const bungaBulanan = bungaTahunan / 12;
  let angsuranBulanan = 0;

  if (bungaBulanan === 0) {
    angsuranBulanan = pokokPinjaman / totalBulan;
  } else {
    angsuranBulanan =
      (pokokPinjaman * bungaBulanan) /
      (1 - Math.pow(1 + bungaBulanan, -totalBulan));
  }

  if (angsuranBox)
    angsuranBox.innerText = formatKeMataUangRupiah(Math.round(angsuranBulanan));
}

// Inisialisasi awal kalkulator saat halaman selesai dimuat penuh
document.addEventListener("DOMContentLoaded", function () {
  sesuaikanDataUnit();
});
