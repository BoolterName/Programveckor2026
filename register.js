document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      alert("Ett konto med denna e-post finns redan!");
      return;
    }
    const user = { email: email, username: username, password: password };
    localStorage.setItem(email, JSON.stringify(user));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "index.html";
  });
});
