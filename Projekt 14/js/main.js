// MOBILE MENU
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__list");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// SIMPLE FORM VALIDATION (Search + Contact)
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