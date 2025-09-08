const div_elem = document.getElementById("editor-front");
div_elem.style.backgroundColor = "white";

const input = document.getElementById("editor-back");

div_elem.addEventListener("click", () => {
  input.focus();
});

input.addEventListener("focus", () => {
  div_elem.style.backgroundColor = "silver";
});

input.addEventListener("blur", () => {
  div_elem.style.backgroundColor = "white";
});

input.addEventListener("input", () => {
  div_elem.textContent = input.value;
});
