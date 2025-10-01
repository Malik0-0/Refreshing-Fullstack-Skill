// Ambil projects dari localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// ========== LIST PAGE ==========

function sortProjectsBy(field, ascending = true) {
  return [...projects].sort((a, b) => {
    if (a[field] < b[field]) return ascending ? -1 : 1; // ascending
    if (a[field] > b[field]) return ascending ? 1 : -1; //decending
    return 0;
  });
}

async function renderProjects(options = {}) {
  const container = document.getElementById("projectList");
  if (!container) return;

  let dataToRender = [...projects];

  if (options.sortField) {
    dataToRender = sortProjectsBy(options.sortField, options.ascending !== false); // default ascending
  }

  container.innerHTML = dataToRender.map((p) => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.images[0] || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="${p.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text text-muted">${p.shortDesc}</p>
          <a href="../views/project-detail.html?id=${p.id}" class="btn btn-primary mt-auto">Detail</a>
          <button class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#editModal" onclick="openEdit(${p.id})">Edit</button>
          <button class="btn btn-danger mt-2" onclick="deleteProject(${p.id})">Delete</button>
        </div>
      </div>
    </div>
  `).join("");
}


renderProjects({
  sortField: "title", // bisa diganti "id" atau field lain
  ascending: true
});

// Foreach + Appendchild
// function renderProjects() {
//   const container = document.getElementById("projectList");
//   if (!container) return;

//   projects.forEach(p => {

//     const col = document.createElement("div");
//     col.className = "col-md-4 mb-4";

//     col.innerHTML = `
//       <div class="card h-100 shadow-sm">
//         <img src="${p.images[0] || 'https://via.placeholder.com/400x200'}" 
//              class="card-img-top" alt="${p.title}">
//         <div class="card-body d-flex flex-column">
//           <h5 class="card-title">${p.title}</h5>
//           <p class="card-text text-muted">${p.shortDesc}</p>
//           <a href="detail-project.html?id=${p.id}" class="btn btn-primary mt-auto">Detail</a>
//           <button class="btn btn-warning mt-2" data-bs-toggle="modal" 
//                   data-bs-target="#editModal" onclick="openEdit(${p.id})">Edit</button>
//           <button class="btn btn-danger mt-2" onclick="deleteProject(${p.id})">Delete</button>
//         </div>
//       </div>
//     `;

//     container.appendChild(col);
//   });
// }

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