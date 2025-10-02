// ========== NAVBAR ACTIVE LINK ==========
document.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop();
  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Ambil projects dari localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// 🔧 helper untuk convert file ke base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}

// 🔧 normalize nama teknologi
function normalizeTech(name) {
  const cleaned = name.toLowerCase().replace(/\./g, "");
  const map = {
    "c++": "cplusplus",
    "c#": "csharp",
    "f#": "fsharp"
  };
  return map[cleaned] || cleaned;
}

// ========== CREATE PROJECT ==========
document.getElementById("projectForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const shortDesc = document.getElementById("shortDesc").value.trim();
  const longDesc = document.getElementById("longDesc").value.trim();
  const github = document.getElementById("github").value.trim();
  const technologies = document
    .getElementById("technologies")
    .value.split(",")
    .map(t => normalizeTech(t.trim()))
    .filter(Boolean);

  // Ambil file gambar → Base64
  const files = document.getElementById("images").files;
  const images = [];
  for (let f of files) {
    images.push(await getBase64(f));
  }

  const newProject = {
    id: Date.now(),
    title,
    shortDesc,
    longDesc,
    github,
    technologies,
    images
  };

  projects.push(newProject);
  localStorage.setItem("projects", JSON.stringify(projects));

  alert("Project added!");
  window.location.href = "list.html";
});

// ========== LIST PAGE ==========
function renderProjects() {
  const container = document.getElementById("projectList");
  if (!container) return;

  container.innerHTML = projects.map((p) => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.images[0] || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${p.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text text-muted">${p.shortDesc}</p>
          <a href="detail.html?id=${p.id}" class="btn btn-primary mt-auto">Detail</a>
          <button class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#editModal" onclick="openEdit(${p.id})">Edit</button>
          <button class="btn btn-danger mt-2" onclick="deleteProject(${p.id})">Delete</button>
        </div>
      </div>
    </div>
  `).join("");
}
renderProjects();

// ========== OPEN EDIT MODAL ==========
let currentEditId = null;
function openEdit(id) {
  currentEditId = id;
  const project = projects.find(p => p.id === id);
  if (!project) return;

  document.getElementById("editId").value = project.id;
  document.getElementById("editTitle").value = project.title;
  document.getElementById("editShortDesc").value = project.shortDesc;
  document.getElementById("editLongDesc").value = project.longDesc;
  document.getElementById("editGithub").value = project.github;
  document.getElementById("editTechnologies").value = project.technologies.join(", ");
  document.getElementById("editImages").value = "";
}

// ========== SAVE EDIT ==========
document.getElementById("editForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById("editId").value);
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return;

  const files = document.getElementById("editImages").files;
  let images = projects[index].images;

  if (files.length > 0) {
    images = [];
    for (let f of files) {
      images.push(await getBase64(f));
    }
  }

  projects[index] = {
    ...projects[index],
    title: document.getElementById("editTitle").value.trim(),
    shortDesc: document.getElementById("editShortDesc").value.trim(),
    longDesc: document.getElementById("editLongDesc").value.trim(),
    github: document.getElementById("editGithub").value.trim(),
    technologies: document.getElementById("editTechnologies").value.split(",").map(t => normalizeTech(t.trim())).filter(Boolean),
    images
  };

  localStorage.setItem("projects", JSON.stringify(projects));

  alert("Project updated!");
  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  renderProjects();
  renderDetail?.();
});

// ========== DELETE ==========
function deleteProject(id) {
  if (!confirm("Hapus project ini?")) return;
  projects = projects.filter(p => p.id !== id);
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
  if (document.getElementById("projectDetail")) {
    window.location.href = "list.html";
  }
}

// ========== DETAIL PAGE ==========
function renderDetail() {
  const container = document.getElementById("projectDetail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const project = projects.find(p => p.id === id);

  if (!project) {
    container.innerHTML = "<p>Project not found</p>";
    return;
  }

  container.innerHTML = `
    <h1>
      ${project.title} 
      <a href="${project.github}" target="_blank" class="ms-2" style="text-decoration: none; color: inherit;">
        <i class="devicon-github-original"></i>
      </a>
    </h1>
    <div class="mb-2 d-flex flex-wrap gap-2 justify-content-start">
      ${project.technologies.map(t => `<i class="devicon-${t}-plain colored fs-4"></i>`).join("")}
    </div>
    <div id="carouselImages" class="carousel slide mb-4">
      <div class="carousel-inner">
        ${project.images.map((img, i) => `
          <div class="carousel-item ${i === 0 ? "active" : ""}">
            <div class="ratio ratio-16x9">
              <img src="${img}" class="d-block w-100 rounded" style="object-fit: contain;">
            </div>
          </div>
        `).join("")}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselImages" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselImages" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
    <p>${project.longDesc}</p>
  `;

  document.getElementById("deleteBtn")?.addEventListener("click", () => deleteProject(project.id));
  document.querySelector('[data-bs-target="#editModal"]')?.addEventListener("click", () => openEdit(project.id));
}
renderDetail();
