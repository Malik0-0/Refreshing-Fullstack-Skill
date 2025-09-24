# Personal Webpage – Code Explanation

This document explains the structure and styles used in the updated **Personal Webpage** project. It covers both the **HTML changes** (new buttons, footer with icons) and the **CSS rules** that make the site look polished.

---

## 📄 HTML Updates

### 1. **About Me Section**
```html
<div class="about-buttons">
    <a href="CV.pdf" class="btn" download><i class="fa-solid fa-download"></i> Download CV</a>
    <a href="mailto:malikalrasyidbasori.1@gmail.com" class="btn btn-secondary"><i class="fa-solid fa-envelope"></i> Contact Me</a>
</div>
```
- **Purpose:** Adds two buttons inside the About Me section:
  - **Download CV:** lets visitors download a PDF file of your CV.
  - **Contact Me:** opens the email app directly with your email address.
- **Attributes:**
  - `download`: makes the link open the file to make user able to download it.
  - `mailto:`: creates a direct link to send you an email.

---

### 2. **Footer with Social Media**
```html
<footer id="contact">
    <p>Connect with me:</p>
    <div class="social-icons">
        <a href="https://github.com/yourusername" target="_blank"><i class="fa-brands fa-github"></i></a>
        <a href="https://linkedin.com/in/yourusername" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://instagram.com/yourusername" target="_blank"><i class="fa-brands fa-instagram"></i></a>
    </div>
    <p>&copy; 2025 Malik Basori</p>
</footer>
```
- **Purpose:** Adds social media icons for GitHub, LinkedIn, and Instagram.
- **Attributes:**
  - `target="_blank"` → opens the link in a new tab.
  - `<i class="fa-brands fa-github"></i>` → Font Awesome icon for GitHub (similar for LinkedIn/Instagram).

---

## 🎨 CSS Explanation

### 1. **Base Styling**
```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.6;
    background: #f9f9f9;
    color: #333;
}
```
- Sets **font** to Arial for readability.  
- Removes default **margin and padding**.  
- Defines a **light background** (`#f9f9f9`) and dark text for contrast.  

---

### 2. **Header and Navigation**
```css
header {
    background: #2c3e50;
    color: #fff;
    padding: 20px 0;
    text-align: center;
}

nav ul li {
    display: inline;
    margin: 0 15px;
}

nav a {
    color: #f1c40f;
    text-decoration: none;
    font-weight: bold;
}
```
- **Header background:** dark blue-gray (`#2c3e50`).  
- **Navigation links:** gold (`#f1c40f`), bold, inline layout.  
- On hover, links underline for feedback.

---

### 3. **About Me Layout**
```css
.about-container {
    display: flex;
    align-items: center;
    margin: 20px;
}

.profile-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 20px;
    border: 4px solid #2c3e50;
}
```
- Uses **Flexbox** to align profile picture and text side by side.  
- Profile image is a **circle** with `border-radius: 50%`.  
- Added a **border** to make the picture stand out.  

---

### 4. **Buttons**
```css
.btn {
    display: inline-block;
    padding: 10px 18px;
    margin-right: 10px;
    background: #2c3e50;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s ease;
}

.btn:hover {
    background: #34495e;
}

.btn-secondary {
    background: #f1c40f;
    color: #2c3e50;
}

.btn-secondary:hover {
    background: #d4ac0d;
}
```
- `.btn`: generic button style (dark background, white text).  
- `.btn-secondary`: alternative yellow button.  
- **Hover effects** make the buttons feel interactive.  
- **Rounded corners** (`border-radius: 5px`) for a modern look.  

---

### 5. **Sections**
```css
section {
    margin: 40px 20px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
```
- Adds **white card-style backgrounds** for each section.  
- **Rounded corners** (`border-radius: 8px`) and **subtle shadow** make them look like separate blocks.  

---

### 6. **Table**
```css
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

table th {
    background: #2c3e50;
    color: #fff;
}
```
- **Full-width table** for clarity.  
- **Collapsed borders** for cleaner lines.  
- Table headers styled with dark background and white text.  

---

### 7. **Aside**
```css
aside {
    margin: 20px;
    padding: 15px;
    background: #ecf0f1;
    border-left: 5px solid #2c3e50;
}
```
- Creates a **highlighted box** for the fun fact.  
- **Border-left** acts like a visual marker.  

---

### 8. **Footer & Social Icons**
```css
footer {
    background: #2c3e50;
    color: #fff;
    text-align: center;
    padding: 20px 0;
    margin-top: 30px;
}

.social-icons a {
    color: #f1c40f;
    margin: 0 10px;
    font-size: 1.6em;
    transition: color 0.3s ease;
}

.social-icons a:hover {
    color: #fff;
}
```
- **Footer:** dark background with white text.  
- **Social icons:** gold by default, change to white on hover.  
- Icons are enlarged (`font-size: 1.6em`) to stand out.  

---

## ✅ Summary
- **HTML:** Added buttons in About Me and replaced footer contact text with social icons.  
- **CSS:** Improved layout with Flexbox, styled buttons, gave sections card-like appearance, and made the footer interactive with icons.  
- Result: A **modern, clean, and user-friendly** personal webpage.  
