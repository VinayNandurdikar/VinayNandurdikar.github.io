document.getElementById("year").textContent = new Date().getFullYear();
// ====== SETTINGS YOU CAN EDIT ======
const CONTACT_EMAIL = "your.email@example.com";
const LINKEDIN_URL  = "https://www.linkedin.com/in/your-profile";

// Put your certificate files here (must match EXACT filenames in assets/certificates/)
const CERTIFICATES = [
  {
    title: "Applied Computational Fluid Dynamics",
    provider: "Siemens (Coursera)",
    year: "2023",
    file: "siemens_applied_cfd.jpg",
  },
  {
    title: "B.E. Mechanical Engineering",
    provider: "Savitribai Phule Pune University",
    year: "2016",
    file: "be_mechanical_degree_pune_university.jpg",
  },
  {
    title: "M.Tech (Thermal Sciences & Energy Systems)",
    provider: "Manipal Institute of Technology",
    year: "2019",
    file: "mtech_thermal_sciences_energy_systems_manipal.jpg",
  },
  {
    title: "GUI-based CFD using ANSYS Fluent",
    provider: "Skill-Lync",
    year: "2021",
    file: "skilllync_ansys_fluent_gui.jpg",
  },
  {
    title: "OpenFOAM CFD",
    provider: "Certificate",
    year: "",
    file: "openfoam_cfd_certificate.pdf",
  },
  {
    title: "CFD Training (DPM / CFD)",
    provider: "Certificate",
    year: "",
    file: "dpm_cfd_training_certificate.pdf",
  },
  {
    title: "Multiphase Flow CFD",
    provider: "Certificate",
    year: "",
    file: "multiphase_flow_cfd_certificate.jpg",
  },
  {
    title: "ANSYS Icepak Thermal Management (Workshop)",
    provider: "NPTEL+",
    year: "2025",
    file: "nptel_ansys_icepak_thermal_management.jpg",
  },
  {
    title: "LS-DYNA: Drop & Impact Analysis (Workshop)",
    provider: "NPTEL+",
    year: "2025",
    file: "nptel_ls_dyna_drop_impact.jpg",
  },
  {
    title: "Mathematics Modeling and Simulation (Workshop)",
    provider: "NPTEL+",
    year: "2025",
    file: "nptel_mathematical_modeling_simulation.jpg",
  },
  {
    title: "Product Design and Development",
    provider: "NPTEL (Elite)",
    year: "2025",
    file: "nptel_product_design_development.jpg",
  },
  {
    title: "MATLAB Onramp",
    provider: "MathWorks",
    year: "",
    file: "matlab_onramp.pdf",
  },
  {
    title: "MATLAB Machine Learning Onramp",
    provider: "MathWorks",
    year: "",
    file: "matlab_machine_learning_onramp.pdf",
  },
  {
    title: "AI for Everyone",
    provider: "Coursera",
    year: "",
    file: "ai_for_everyone_coursera.pdf",
  },
  {
    title: "Sports & Building Aerodynamics",
    provider: "Coursera",
    year: "",
    file: "coursera_sports_building_aerodynamics.pdf",
  },
  {
    title: "Sanskrit Parichaya",
    provider: "Samskrita Bharati",
    year: "",
    file: "sanskrit_parichaya_samskrita_bharati.jpg",
  },
  {
    title: "Sanskrit Pravesh",
    provider: "Samskrita Bharati",
    year: "",
    file: "sanskrit_pravesh_samskrita_bharati.jpg",
  },
  {
    title: "CFD for Professionals",
    provider: "Udemy",
    year: "2022",
    file: "udemy_cfd_for_professionals.jpg",
  },
  {
    title: "CFD Fundamentals Course",
    provider: "Udemy",
    year: "2022",
    file: "udemy_cfd_fundamentals.jpg",
  },
  {
    title: "STAR-CCM+ CFD Certificate",
    provider: "Certificate",
    year: "",
    file: "starccm_plus_cfd_certificate.jpg",
  },
];

// ====== DO NOT EDIT BELOW (unless you want to) ======
const CERT_BASE = "assets/certificates/";

function isPdf(file) {
  return file.toLowerCase().endsWith(".pdf");
}

function makeCertCard(cert) {
  const href = CERT_BASE + cert.file;

  const a = document.createElement("a");
  a.className = "cert";
  a.href = href;
  a.target = "_blank";
  a.rel = "noreferrer";

  const top = document.createElement("div");
  top.className = "cert-top";

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = isPdf(cert.file) ? "PDF" : "IMG";

  top.appendChild(badge);

  if (isPdf(cert.file)) {
    const pdfIcon = document.createElement("div");
    pdfIcon.className = "pdf-icon";
    pdfIcon.textContent = "PDF";
    top.appendChild(pdfIcon);
  } else {
    const img = document.createElement("img");
    img.src = href;
    img.alt = cert.title;
    top.appendChild(img);
  }

  const body = document.createElement("div");
  body.className = "cert-body";

  const title = document.createElement("div");
  title.className = "cert-title";
  title.textContent = cert.title;

  const meta = document.createElement("div");
  meta.className = "cert-meta";
  const year = cert.year ? ` • ${cert.year}` : "";
  meta.textContent = `${cert.provider}${year}`;

  body.appendChild(title);
  body.appendChild(meta);

  a.appendChild(top);
  a.appendChild(body);

  return a;
}

function renderCertificates(list) {
  const grid = document.getElementById("certGrid");
  grid.innerHTML = "";
  list.forEach(c => grid.appendChild(makeCertCard(c)));
}

function setupSearch() {
  const input = document.getElementById("certSearch");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return renderCertificates(CERTIFICATES);

    const filtered = CERTIFICATES.filter(c => {
      const text = `${c.title} ${c.provider} ${c.year} ${c.file}`.toLowerCase();
      return text.includes(q);
    });
    renderCertificates(filtered);
  });
}

function setupTheme() {
  const btn = document.getElementById("themeBtn");
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  const updateIcon = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = isDark ? "☀️" : "🌙";
  };
  updateIcon();

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "" : "dark";
    if (next) document.documentElement.setAttribute("data-theme", next);
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", next);
    updateIcon();
  });
}

function setupContact() {
  document.getElementById("year").textContent = new Date().getFullYear();

  const emailText = document.getElementById("emailText");
  emailText.textContent = CONTACT_EMAIL;

  const sendEmailBtn = document.getElementById("sendEmailBtn");
  sendEmailBtn.href = `mailto:${CONTACT_EMAIL}`;

  const linkedinLink = document.getElementById("linkedinLink");
  linkedinLink.href = LINKEDIN_URL;
  linkedinLink.textContent = LINKEDIN_URL.replace("https://", "");

  document.getElementById("copyEmailBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      alert("Email copied!");
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  });
}

renderCertificates(CERTIFICATES);
setupSearch();
setupTheme();
setupContact();

