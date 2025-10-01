// Ambil projects dari localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];

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
      <a href="${project.github}" target="_blank" class="ms-2" style="text-decoration: none; color: inherit;">
        <i class="devicon-github-original"></i>
      </a>
      ${project.title} 
    </h1>
    <div id="carouselImages" class="carousel slide mb-4">
      <div class="carousel-inner">
        ${project.images.map((img, i) => `
          <div class="carousel-item ${i === 0 ? "active" : ""}">
            <img src="${img}" 
                 class="d-block w-100 rounded"
                 style="object-fit: cover; height: auto; max-height: 600px;">
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
    <div class="mb-4 d-flex flex-wrap gap-2 justify-content-start">
      ${project.technologies.map(t => `<i class="devicon-${t}-plain colored fs-4"></i>`).join("")}
    </div>
    <p>${project.longDesc}</p>
  `;

  document.getElementById("deleteBtn")?.addEventListener("click", () => deleteProject(project.id));
  document.querySelector('[data-bs-target="#editModal"]')?.addEventListener("click", () => openEdit(project.id));
}

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

renderDetail();
