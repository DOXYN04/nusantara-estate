/* ==========================================================================
   LOGIKA GLOBAL RESMI - NAVIGATION MENU INTERACTIVE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  // Memastikan elemen tombol menu dan container menu ada di halaman sebelum dieksekusi
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
});
