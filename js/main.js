// MOBILE MENU
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__list");

function setMenuOpen(open) {
  if (!toggle || !menu) return;

  menu.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
}

if (toggle && menu) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains("is-open");
    setMenuOpen(!isOpen);
  });

  // Klick utanför stänger
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("is-open")) return;

    const clickedInside = menu.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside) setMenuOpen(false);
  });

  // ESC stänger
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenuOpen(false);
  });

  // Klick på en länk stänger menyn (bra på mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

/* =========================================================
   SIMPLE FORM VALIDATION (Search + Contact)
========================================================= */
function setError(id, message) {
  const el = document.querySelector(`[data-error-for="${id}"]`);
  if (el) el.textContent = message || "";
}

function validateField(input) {
  const id = input.id;

  if (input.validity.valueMissing) {
    setError(id, "This field is required.");
    return false;
  }
  if (input.validity.typeMismatch) {
    setError(id, "Please enter a valid value.");
    return false;
  }
  if (input.validity.tooShort) {
    setError(id, `Please enter at least ${input.minLength} characters.`);
    return false;
  }

  setError(id, "");
  return true;
}

document.querySelectorAll("form[novalidate]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    const inputs = Array.from(form.querySelectorAll("input, textarea"));
    const ok = inputs.every(validateField);

    if (!ok) e.preventDefault();
  });

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("is-touched")) validateField(field);
    });
    field.addEventListener("focus", () => field.classList.add("is-touched"));
  });
});