# HTML Elements Explanation

## Headings (`h1–h6`)
- **Purpose:** Define titles or subtitles, creating a hierarchy.
- **Hierarchy:**
  - `<h1>` → Main title (use once per page).
  - `<h2>` → Subsections of `<h1>`.
  - `<h3>` → Subsections of `<h2>`.
  - `<h4>`–`<h6>` → Lower-level headings.
- **Difference from `<p>`:** Headings give *structure* and meaning, while `<p>` is just text.

---

## Paragraphs (`p`)
- **Purpose:** Used for blocks of text, sentences, or descriptions.
- **Difference:** Unlike headings, paragraphs don’t define hierarchy, they just hold content.

---

## Navigation (`nav`, `a`)
- **`<nav>`:** A semantic container for navigation links.
- **`<a>` (anchor):** Creates a hyperlink to another page, section, or website.
- **Why often in `<header>`?** Navigation menus are usually at the top, but `<nav>` can appear anywhere (like sidebar or footer).

---

## Sections (`section`, `article`, `aside`, `div`)
- **`<section>`:** A thematic grouping of content (e.g., "About Me").
- **`<article>`:** Self-contained, independent content (e.g., blog post, resume entry).
- **`<aside>`:** Secondary or related content (e.g., fun fact, ad, sidebar).
- **`<div>`:** Generic container, used only when no better semantic tag fits.

**Comparison:**
- `section` → thematic grouping  
- `article` → independent content  
- `aside` → extra/side info  
- `div` → generic box  

---

## Lists (`ul`, `ol`)
- **`<ul>` (unordered list):** Items with no order (bullets).
- **`<ol>` (ordered list):** Items with sequence/rank (numbers).
- **Difference:** Use `<ol>` for steps/rankings, `<ul>` for categories.

---

## Table (`table`, `tr`, `th`, `td`)
- **`<table>`:** Container for tabular data.
- **`<tr>`:** A row in the table.
- **`<th>`:** Header cell, bold by default, defines a column/row heading.
- **`<td>`:** Standard data cell.

**Comparison:**
- `tr` = row  
- `th` = header cell  
- `td` = normal data cell  

---

## Quote (`blockquote`)
- **Purpose:** Used for quotations, usually indented automatically by browsers.
- **Difference from `<p>`:** `<blockquote>` has semantic meaning (“this is a quote”), while `<p>` is plain text.

---

## Header & Footer (`header`, `footer`)
- **`<header>`:** Intro section at the top of a page or section, often with navigation and titles.
- **`<footer>`:** Closing section, usually at the bottom, often with contact info, copyright, or links.

**Comparison:**
- `header` = introduction/top  
- `footer` = conclusion/bottom  

---

# 📌 Quick Cheat Sheet (Table)

| Element        | Purpose                          | Notes / Differences                       |
|----------------|----------------------------------|-------------------------------------------|
| `h1–h6`        | Titles and subtitles             | Hierarchical, `h1` is top-level           |
| `p`            | Paragraph text                   | Just content, no hierarchy                |
| `nav`          | Navigation section               | Usually in `header`, but can be anywhere  |
| `a`            | Link (anchor)                    | Jumps to another page/section             |
| `section`      | Thematic grouping                | Needs a heading inside                    |
| `article`      | Independent/self-contained piece | Can stand alone (blog post, resume entry) |
| `aside`        | Side or extra info               | Sidebar, related content                  |
| `div`          | Generic container                | No semantic meaning                       |
| `ul`           | Unordered list                   | Bullets                                   |
| `ol`           | Ordered list                     | Numbers                                   |
| `table`        | Table container                  | Holds rows and cells                      |
| `tr`           | Table row                        | Groups `td`/`th`                          |
| `th`           | Table header cell                | Bold/centered by default                  |
| `td`           | Table data cell                  | Normal cell                               |
| `blockquote`   | Quotation                        | Semantic meaning, indented                |
| `header`       | Page/section introduction        | Often contains nav/logo                   |
| `footer`       | Page/section conclusion          | Contact, copyright                        |