document.addEventListener("DOMContentLoaded", () => {
  // document.getElementById("login-form").addEventListener("submit", function (event) {
  //   event.preventDefault();

  //   const email = document.getElementById("login-email").value;
  //   const password = document.getElementById("login-password").value;

  //   if (email === "admin" && password === "admin") {
  //     document.getElementById("login-success").innerText = "Login successful!";
  //     document.getElementById("login-success").style.display = "block";
  //     document.getElementById("login-error").style.display = "none";
  //     setTimeout(() => {
  //       window.location.href = "public/admin/admin.html";
  //     }, 1500);
  //   } else {
  //     document.getElementById("login-error").innerText = "Invalid email or password.";
  //     document.getElementById("login-error").style.display = "block";
  //     document.getElementById("login-success").style.display = "none";
  //   }
  // });

  // document.getElementById("register-form").addEventListener("submit", function (event) {
  //   event.preventDefault();

  //   const name = document.getElementById("register-name").value;
  //   const email = document.getElementById("register-email").value;
  //   const password = document.getElementById("register-password").value;

  //   if (name && email && password) {
  //     document.getElementById("register-success").innerText = "Registration successful!";
  //     document.getElementById("register-success").style.display = "block";
  //     document.getElementById("register-error").style.display = "none";
  //   } else {
  //     document.getElementById("register-error").innerText = "Please fill all fields.";
  //     document.getElementById("register-error").style.display = "block";
  //     document.getElementById("register-success").style.display = "none";
  //   }
  // });

  const container = document.getElementById("container");
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const success = document.getElementById("success");
  const error = document.getElementById("error");

  // Register
  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  
    const register = {
      email: emailInput.value,
      password: passwordInput.value
    };

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(data => {
      if (data.status === "error") {
        success.style.display = "none";
        error.style.display = "block";
        error.innerText = data.error;
      } else {
        error.style.display = "none";
        success.style.display = "block";
        success.innerText = data.success;
      }
    });
  });

  // Login  
  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  
    const login = {
      email: emailInput.value,
      password: passwordInput.value
    };
  
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(data => {
      if (data.status === "error") {
        success.style.display = "none";
        error.style.display = "block";
        error.innerText = data.error;
      } else {
        error.style.display = "none";
        success.style.display = "block";
        success.innerText = data.success;
      }
    });
  });
});