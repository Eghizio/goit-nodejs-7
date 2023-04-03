const registerBtn = document.querySelector("button#register");

registerBtn.addEventListener("click", () => {
  const email = document.querySelector("input#email").value;
  const pwd = document.querySelector("input#pwd").value;

  const body = { email, pwd };

  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
});