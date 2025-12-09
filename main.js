document.addEventListener("DOMContentLoaded", () => {
  // Sidebar toggle (mobile)
  window.toggleSidebar = () => {
    const sb = document.getElementById("sidebar");
    if (sb) sb.classList.toggle("-translate-x-full");
  };

  // Active nav link
  const current = window.location.pathname.split("/").pop().replace(".html", "");
  document.querySelectorAll("nav a").forEach((link) => {
    if (link.dataset.page === current) {
      link.classList.add("bg-black", "text-white");
    }
  });

  // Modal helpers (open/close via data attributes)
  const openModal = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("hidden");
      el.classList.add("flex");
    }
  };
  const closeModal = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("hidden");
      el.classList.remove("flex");
    }
  };

  document.querySelectorAll("[data-modal-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal-target");
      if (id) openModal(id);
    });
  });
  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal-close");
      if (id) closeModal(id);
    });
  });

  // Demo profile storage (localStorage)
  const profileKeys = {
    fullName: "na_profile_full_name",
    email: "na_profile_email",
    phone: "na_profile_phone",
    address: "na_profile_address",
    updatedAt: "na_profile_updated_at",
  };

  const loadProfile = () => {
    const fullName = localStorage.getItem(profileKeys.fullName);
    const email = localStorage.getItem(profileKeys.email);
    const phone = localStorage.getItem(profileKeys.phone);
    const address = localStorage.getItem(profileKeys.address);
    const updatedAt = localStorage.getItem(profileKeys.updatedAt);

    const setText = (id, value, fallback = "—") => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || fallback;
    };

    setText("profileFullName", fullName, "FIO kiritilmagan");
    setText("profileEmail", email);
    setText("profilePhone", phone);
    setText("profileAddress", address);
    setText("profileUpdatedAt", updatedAt);

    const statusEl = document.getElementById("profileStatus");
    if (statusEl) {
      if (fullName || email || phone || address) {
        statusEl.textContent = "Ro'yxatdan o‘tgan (demo)";
        statusEl.className =
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700";
      } else {
        statusEl.textContent = "Ro'yxatdan o‘tmagan";
        statusEl.className =
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700";
      }
    }
  };

  const saveProfileData = (payload) => {
    const now = new Date().toLocaleString("uz-UZ");
    localStorage.setItem(profileKeys.fullName, payload.fullName);
    localStorage.setItem(profileKeys.email, payload.email);
    localStorage.setItem(profileKeys.phone, payload.phone || "");
    localStorage.setItem(profileKeys.address, payload.address || "");
    localStorage.setItem(profileKeys.updatedAt, now);
    loadProfile();
  };

  // Register form submit
  const registerForm = document.getElementById("registerForm");
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("inputFullName")?.value.trim();
    const email = document.getElementById("inputEmail")?.value.trim();
    const phone = document.getElementById("inputPhone")?.value.trim();
    const address = document.getElementById("inputAddress")?.value.trim();

    if (!fullName || !email) {
      alert("Iltimos, kamida FIO va Email kiriting.");
      return;
    }
    saveProfileData({ fullName, email, phone, address });
    closeModal("registerModal");
  });

  // Edit form submit (prefill on open)
  const editForm = document.getElementById("editForm");
  const prefillEdit = () => {
    document.getElementById("editFullName").value =
      localStorage.getItem(profileKeys.fullName) || "";
    document.getElementById("editEmail").value =
      localStorage.getItem(profileKeys.email) || "";
    document.getElementById("editPhone").value =
      localStorage.getItem(profileKeys.phone) || "";
    document.getElementById("editAddress").value =
      localStorage.getItem(profileKeys.address) || "";
  };
  document
    .querySelector('[data-modal-target="editModal"]')
    ?.addEventListener("click", prefillEdit);

  editForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("editFullName")?.value.trim();
    const email = document.getElementById("editEmail")?.value.trim();
    const phone = document.getElementById("editPhone")?.value.trim();
    const address = document.getElementById("editAddress")?.value.trim();

    if (!fullName || !email) {
      alert("Iltimos, kamida FIO va Email kiriting.");
      return;
    }
    saveProfileData({ fullName, email, phone, address });
    closeModal("editModal");
  });

  // Login form (demo-only: just closes modal)
  const loginForm = document.getElementById("loginForm");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal("loginModal");
  });

  // Logout
  document.getElementById("confirmLogout")?.addEventListener("click", () => {
    Object.values(profileKeys).forEach((k) => localStorage.removeItem(k));
    loadProfile();
    closeModal("logoutModal");
  });

  // Initial load
  loadProfile();

  // Apex chart init (dashboard only)
  const getBrandColor = () => {
    const computedStyle = getComputedStyle(document.documentElement);
    return (
      computedStyle.getPropertyValue("--color-fg-brand").trim() || "#1447E6"
    );
  };
  const brandColor = getBrandColor();

  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: { enabled: false },
      toolbar: { show: false },
    },
    tooltip: { enabled: true, x: { show: false } },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: brandColor,
        gradientToColors: [brandColor],
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 6 },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: { left: 2, right: 2, top: 0 },
    },
    series: [{ name: "New users", data: [6500, 6418, 6456, 6526, 6356, 6456], color: brandColor }],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  };

  if (
    document.getElementById("area-chart") &&
    typeof ApexCharts !== "undefined"
  ) {
    const chart = new ApexCharts(
      document.getElementById("area-chart"),
      options
    );
    chart.render();
  }
});
const div = document.getElementById('myDiv');

function checkWidth() {
  if (window.innerWidth >= 768) {
    div.style.flexDirection = 'row';
  } else {
    div.style.flexDirection = 'column';
  }
}

window.addEventListener('resize', checkWidth);
checkWidth(); // sahifa ochilganda tekshirish