// Year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function setTheme(mode) {
  if (mode === "dark") {
    root.setAttribute("data-theme", "dark");
    themeBtn.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeBtn.textContent = "🌙";
  }
  localStorage.setItem("theme", mode);
}

const saved = localStorage.getItem("theme");
setTheme(saved === "dark" ? "dark" : "light");

themeBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  setTheme(isDark ? "light" : "dark");
});

// Project filters
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".p-card");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const show = chip.dataset.show;
    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(",").map(s => s.trim());
      const ok = (show === "All") || tags.includes(show);
      card.style.display = ok ? "block" : "none";
    });
  });
});

// Software cards scroll to projects + preselect filter
document.querySelectorAll(".card").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter || "All";
    const targetChip = [...chips].find(c => c.dataset.show === filter) || chips[0];
    targetChip.click();
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
  });
});

// Modals
document.querySelectorAll(".linkbtn[data-modal]").forEach(b => {
  b.addEventListener("click", () => {
    const id = b.getAttribute("data-modal");
    const dlg = document.getElementById(id);
    if (dlg && typeof dlg.showModal === "function") dlg.showModal();
  });
});

document.querySelectorAll("[data-close]").forEach(x => {
  x.addEventListener("click", () => {
    const dlg = x.closest("dialog");
    if (dlg) dlg.close();
  });
});

// Close dialog on outside click
document.querySelectorAll("dialog.modal").forEach(dlg => {
  dlg.addEventListener("click", (e) => {
    const rect = dlg.getBoundingClientRect();
    const inDialog = rect.top <= e.clientY && e.clientY <= rect.bottom &&
                     rect.left <= e.clientX && e.clientX <= rect.right;
    if (!inDialog) dlg.close();
  });
});

// Copy email
const copyBtn = document.getElementById("copyEmailBtn");
const copyStatus = document.getElementById("copyStatus");
copyBtn?.addEventListener("click", async () => {
  const email = "your.email@example.com";
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied to clipboard.";
  } catch {
    copyStatus.textContent = "Copy failed. Please copy manually: " + email;
  }
});
