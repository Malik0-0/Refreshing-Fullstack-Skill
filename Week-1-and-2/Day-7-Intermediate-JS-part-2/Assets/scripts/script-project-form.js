
// Ambil projects dari localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// Helper untuk convert file ke base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}

// Normalize nama teknologi
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
  window.location.href = "project-list.html";
});