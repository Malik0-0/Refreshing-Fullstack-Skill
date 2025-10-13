document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
});
// Set field value
function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || "";
}

// Open edit modal
window.openEdit = async function (id) {
  try {
    // Fetch project data from API
    const res = await fetch(`/projects/api/${id}`);
    const data = await res.json();

    if (!data.success) return alert("❌ Project not found!");

    const project = data.project;

    // Fill modal fields with DB values
    setValue("editId", project.id);
    setValue("editTitle", project.title);
    setValue("editShortDesc", project.short_desc);
    setValue("editLongDesc", project.long_desc);
    setValue("editGithub", project.github);
    setValue("editTechnologies", project.technologies);

    // Show preview images if exist
    const previewContainer = document.getElementById("imagePreview");
    previewContainer.innerHTML = "";
    if (project.images?.length) {
      project.images.forEach(img => {
        const imageEl = document.createElement("img");
        imageEl.src = img.startsWith("/") ? img : `/uploads/${img}`;
        imageEl.classList.add("preview-img");
        previewContainer.appendChild(imageEl);
      });
    }

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();

  } catch (err) {
    console.error("❌ Error fetching project:", err);
    alert("Server error fetching project data!");
  }
};

// Submit edit form
document.getElementById("editForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editId").value;
  const title = document.getElementById("editTitle").value.trim();
  const shortDesc = document.getElementById("editShortDesc").value.trim();
  const longDesc = document.getElementById("editLongDesc").value.trim();
  const github = document.getElementById("editGithub").value.trim();
  const technologies = document.getElementById("editTechnologies").value.trim();
  const images = document.getElementById("editImages").files;

  // Create FormData for text + files
  const formData = new FormData();
  formData.append("title", title);
  formData.append("shortDesc", shortDesc);
  formData.append("longDesc", longDesc);
  formData.append("github", github);
  formData.append("technologies", technologies);

  for (let file of images) {
    formData.append("images", file);
  }

  try {
    const res = await fetch(`/projects/edit/${id}`, {
      method: "POST",
      body: formData
    });

    const result = await res.json();

    if (result.success) {
      alert("Project updated successfully!");
      window.location.reload();
    } else {
      alert("Failed to update project!");
    }
  } catch (err) {
    console.error("Error updating project:", err);
    alert("Server error while updating project!");
  }
});

// Delete project
window.deleteProject = async function (id) {
  if (!confirm("Are you sure you want to delete this project?")) return;

  try {
    const res = await fetch(`/projects/delete/${id}`, { method: "POST" });
    const result = await res.json();
    if (result.success) {
      alert("Project deleted!");
      window.location.href = "/projects";
    } else {
      alert("Failed to delete project!");
    }
  } catch (err) {
    console.error("Error deleting project:", err);
    alert("Server error!");
  }
};