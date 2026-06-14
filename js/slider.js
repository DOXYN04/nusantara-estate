/* ==========================================================================
   LOGIKA INTERAKTIF SLIDER & GALERI SIANG-MALAM
   ========================================================================== */

/* 1. Fungsi Menggeser Slider Galeri Visual Produk (Halaman Utama) */
function scrollVisual(arah) {
  const slider = document.getElementById("visual-slider");
  if (slider) {
    const lebarItem = slider.clientWidth * 0.65;
    if (arah === "kanan") {
      slider.scrollLeft += lebarItem;
    } else {
      slider.scrollLeft -= lebarItem;
    }
  }
}

/* 2. Fungsi Menggeser Slider Landscape (Halaman Katalog) */
function scrollSlider(arah) {
  const slider = document.getElementById("landscape-slider");
  if (slider) {
    const lebarItem = slider.clientWidth * 0.8;
    if (arah === "kanan") {
      slider.scrollLeft += lebarItem;
    } else {
      slider.scrollLeft -= lebarItem;
    }
  }
}

/* 3. Fungsi Mengontrol Geser Foto Siang/Malam (Halaman Utama) */
function slideGambar(idElement, index) {
  const container = document.getElementById(idElement);
  if (container) {
    container.style.transform = `translateX(-${index * 100}%)`;
    const dots =
      container.nextElementSibling.nextElementSibling.nextElementSibling
        .children;
    if (dots && dots.length >= 2) {
      if (index === 0) {
        dots[0].classList.add("bg-white");
        dots[0].classList.remove("bg-white/50");
        dots[1].classList.add("bg-white/50");
        dots[1].classList.remove("bg-white");
      } else {
        dots[1].classList.add("bg-white");
        dots[1].classList.remove("bg-white/50");
        dots[0].classList.add("bg-white/50");
        dots[0].classList.remove("bg-white");
      }
    }
  }
}

/* 4. Fungsi Mengontrol Geser Foto Siang/Malam (Halaman Katalog) */
function slideKatalog(idElement, index) {
  const container = document.getElementById(idElement);
  if (container) {
    container.style.transform = `translateX(-${index * 100}%)`;
  }
}

/* 5. Trigger Sistem Animasi Muncul Gradual Saat Di-Scroll (Intersection Observer) */
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".fitur-card");
  const visualText = document.getElementById("visual-text-trigger");
  const textTrigger = document.getElementById("landscape-text-trigger");
  const observerOptions = { root: null, threshold: 0.15 };

  // Animasi Kartu Keunggulan (Beranda)
  const keunggulanObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("muncul");
          }, index * 200);
        });
        keunggulanObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const gridContainer = document.getElementById("grid-keunggulan");
  if (gridContainer) keunggulanObserver.observe(gridContainer);

  // Animasi Teks Visual Produk (Beranda)
  const visualObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aktif");
          visualObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.3 },
  );

  if (visualText) visualObserver.observe(visualText);

  // Animasi Teks Landscape (Katalog)
  const textObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aktif");
          textObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.3 },
  );

  if (textTrigger) textObserver.observe(textTrigger);
});
