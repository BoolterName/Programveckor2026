document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Fyll i både e-post och lösenord.");
      return;
    }

    const storedUser = localStorage.getItem(email);

    if (!storedUser) {
      alert("Fel e-post eller användaren finns inte.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password !== password) {
      alert("Fel lösenord, försök igen.");
      return;
    }

    // Spara inloggad användare
    localStorage.setItem("loggedInUser", JSON.stringify({
      username: user.username,
      email: user.email
    }));

    window.location.href = "index.html";
  });
});
