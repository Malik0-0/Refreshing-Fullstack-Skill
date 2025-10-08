// ========================== PROJECT LIST HANDLERS ========================== //

// 🧠 Utility: safely set field value
function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || "";
}

// 🧩 OPEN EDIT MODAL
window.openEdit = function (id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  if (!card) return alert("Project not found!");

  const title = card.querySelector(".card-title")?.innerText || "";
  const shortDesc = card.querySelector(".card-text")?.innerText || "";
  const github = card.querySelector(".btn-outline-success")?.href || "";
  const tech = card.querySelector(".tech-list")?.innerText || "";
  const longDesc = card.dataset.longdesc || "";

  // Fill modal
  setValue("editId", id);
  setValue("editTitle", title);
  setValue("editShortDesc", shortDesc);
  setValue("editLongDesc", longDesc);
  setValue("editGithub", github);
  setValue("editTechnologies", tech);

  // Clear image input on open
  document.getElementById("editImages").value = "";

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
};

// 🗑️ DELETE PROJECT
window.deleteProject = async function (id) {
  if (!confirm("Are you sure you want to delete this project?")) return;

  try {
    const res = await fetch(`/projects/delete/${id}`, { method: "POST" });
    const result = await res.json();
    if (result.success) {
      alert("🗑️ Project deleted!");
      window.location.reload();
    } else {
      alert("❌ Failed to delete project!");
    }
  } catch (err) {
    console.error("Error deleting project:", err);
    alert("⚠️ Server error!");
  }
};

// 💾 SUBMIT EDIT FORM
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
      alert("✅ Project updated successfully!");
      window.location.reload();
    } else {
      alert("❌ Failed to update project!");
    }
  } catch (err) {
    console.error("Error updating project:", err);
    alert("⚠️ Server error while updating project!");
  }
});

// ========================== IMAGE PREVIEW HANDLER ========================== //
document.getElementById("editImages")?.addEventListener("change", function () {
  const previewContainer = document.getElementById("imagePreview");
  previewContainer.innerHTML = ""; // clear old previews

  const files = Array.from(this.files);
  if (!files.length) return;

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = file.name;
      img.classList.add("preview-img");
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});
