// Draws the page from content.js, plus the t1ld3 touches: the ASCII noise
// band, the starfield and the day/night switch.
import { content } from "./content.js";

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPES[char]);
// Only web, mail and local links.
const safeUrl = (url) => (/^(https?:|mailto:)/i.test(url) || /^[\w./-]+$/.test(url) ? url : "#");
const link = ([label, url]) => {
  const outside = /^https?:/i.test(url);
  return `<a href="${esc(safeUrl(url))}"${outside ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(label)}${outside ? " ↗" : ""}</a>`;
};

// The theme: auto follows the system; the button cycles auto, night, day.
const THEMES = ["auto", "night", "day"];
function storedTheme() {
  try {
    return localStorage.getItem("kaylamc.theme") ?? "auto";
  } catch {
    return "auto";
  }
}
function applyTheme(theme) {
  if (theme === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
  const button = document.querySelector(".theme");
  if (button) button.textContent = theme;
}

// A row of ASCII noise, a few glyphs in the accent.
function noise(columns, rows = 2) {
  const glyphs = " .,:;'`-~+*";
  const line = () => Array.from({ length: columns }, () => {
    const glyph = Math.random() < 0.82 ? " " : glyphs[1 + Math.floor(Math.random() * (glyphs.length - 1))];
    return glyph !== " " && Math.random() < 0.25 ? `<span class="speck">${glyph}</span>` : glyph;
  }).join("");
  return Array.from({ length: rows }, line).join("\n");
}

function section(id, title, body) {
  return body ? `<section id="${id}"><h2>${esc(title)}</h2>${body}</section>` : "";
}

function projectHtml(project, index) {
  const pictures = project.images.length
    ? `<div class="shots">${project.images.map(([file, alt]) => `<img src="images/${esc(file)}" alt="${esc(alt)}" loading="lazy">`).join("")}</div>`
    : `<pre class="shot-noise" aria-hidden="true">${noise(64, 6)}</pre>`;
  return `
    <article class="project">
      <header><span class="number">${String(index + 1).padStart(2, "0")}</span><h3>${esc(project.name)}</h3><p class="tagline">${esc(project.tagline)}</p></header>
      ${pictures}
      <p>${esc(project.about)}</p>
      <ul class="stack">${project.stack.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      <p class="links">${project.links.map(link).join(" · ")}</p>
    </article>`;
}

function render() {
  const c = content;
  const now = c.now.map((item) => `<li><span class="what">${esc(item.what)}</span><span class="where">${esc(item.where)}</span><span class="when">${esc(item.when)}</span>${item.note ? `<p>${esc(item.note)}</p>` : ""}</li>`).join("");
  const more = c.more.map((item) => `<li><b>${item.link ? link([item.title, item.link]) : esc(item.title)}</b>${item.detail ? ` <span class="muted">· ${esc(item.detail)}</span>` : ""}</li>`).join("");
  const skills = Object.entries(c.skills).map(([group, items]) => `<div><h3>${esc(group)}</h3><p>${items.map(esc).join(" · ")}</p></div>`).join("");
  const links = [...c.links.map(link), c.cv ? `<a href="${esc(safeUrl(c.cv))}" download>cv ↓</a>` : ""].filter(Boolean).join(" · ");

  document.querySelector("main").innerHTML = `
    <section class="hero">
      <h1>${esc(c.name)}<span class="cursor" aria-hidden="true">_</span></h1>
      <p class="intro">${esc(c.intro)}</p>
      ${links ? `<p class="links">${links}</p>` : ""}
    </section>
    ${section("now", "now", now && `<ul class="now">${now}</ul>`)}
    ${section("projects", "projects", c.projects.map(projectHtml).join(""))}
    ${section("more", "more", more && `<ul class="more">${more}</ul>`)}
    ${section("skills", "skills", skills && `<div class="skills">${skills}</div>`)}
    ${section("contact", "say hi", links && `<p class="links">${links}</p>`)}`;
  document.querySelector(".year").textContent = new Date().getFullYear();
}

function fillNoise() {
  const columns = Math.ceil(window.innerWidth / 7);
  document.querySelector(".noise").innerHTML = noise(columns);
}

applyTheme(storedTheme());
document.querySelector(".theme").addEventListener("click", () => {
  const next = THEMES[(THEMES.indexOf(storedTheme()) + 1) % THEMES.length];
  try {
    localStorage.setItem("kaylamc.theme", next);
  } catch {
    // Storage is off: it lasts until the page closes.
  }
  applyTheme(next);
});
render();
fillNoise();
// The noise twinkles now and then, unless motion is turned down.
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(fillNoise, 2400);
