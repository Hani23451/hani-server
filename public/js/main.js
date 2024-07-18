//  toogle sidebar

document.addEventListener("DOMContentLoaded", () => {
  toggleSidebar();
  makeLinkActive();
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("sidebarToggle");

  toggleButton.addEventListener("click", () => {
    if (sidebar.classList.contains("-translate-x-full")) {
      sidebar.classList.remove("-translate-x-full");
    } else {
      sidebar.classList.add("-translate-x-full");
    }
  });
}

// make linke active
function makeLinkActive() {
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll("#sidebar a");

  sidebarLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}
