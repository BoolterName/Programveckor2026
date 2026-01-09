document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      alert("Fel e-post eller användaren finns inte.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      alert("Fel lösenord, försök igen.");
    }
  });
});
