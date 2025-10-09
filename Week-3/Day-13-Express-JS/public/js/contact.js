document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
  
    // Create toast element dynamically
    const toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast-message";
    toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> Message sent successfully!`;
    document.body.appendChild(toast);
  
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const purpose = form.purpose.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !purpose || !message) {
      showToast("Please fill all fields", false);
      return;
    }

    // Send data to backend
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, purpose, message })
      });

      const result = await res.json();

      if (result.success) {
        showToast("Message sent successfully!", true);
        form.reset();
      } else {
        showToast("Failed to send message.", false);
      }
    } catch (err) {
      console.error("Error:", err);
      showToast("Server error. Try again later.", false);
    }
  });

  function showToast(message, success = true) {
    toast.innerHTML = success
      ? `<i class="bi bi-check-circle-fill"></i> ${message}`
      : `<i class="bi bi-exclamation-triangle-fill"></i> ${message}`;
    toast.style.color = success ? "#18d26e" : "#ff6b6b";
    toast.style.borderColor = success ? "#18d26e" : "#ff6b6b";
    toast.style.boxShadow = success
      ? "0 0 15px rgba(24, 210, 110, 0.4)"
      : "0 0 15px rgba(255, 107, 107, 0.4)";
    toast.classList.add("show");

    setTimeout(() => toast.classList.remove("show"), 3000);
    }
  });
  