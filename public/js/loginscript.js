const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");

  const register = {
    email: email.value,
    password: password.value
  }

  fetch("/api/register", {
    metdho: "POST",
    body: JSON.stringify(register),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
  .then(data => {
    if (data.status == "error") {
      success.style.display = "block"
    }
  })
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});