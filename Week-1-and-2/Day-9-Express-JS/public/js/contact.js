document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
  
    // Create toast element dynamically (so you don’t have to hardcode it)
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast-message";
    toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> Message sent successfully!`;
    document.body.appendChild(toast);
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Simulate sending process (like email or API)
      setTimeout(() => {
        showToast("Message sent successfully!");
        form.reset();
      }, 300);
    });
  
    function showToast(message) {
      toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${message}`;
      toast.classList.add("show");
  
      // Automatically hide after 3 seconds
      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  });
  