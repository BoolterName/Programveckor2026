document.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcome-text");
  const logoutBtn = document.getElementById("logout-btn");

  // Hämta inloggad användare
  const loggedUser = localStorage.getItem("loggedInUser");

  if (!loggedUser) {
    // Om ingen är inloggad → skicka tillbaka till login
    window.location.href = "login.html";
    return;
  }

  const user = JSON.parse(loggedUser);

  // Visa välkomsttext
  welcomeText.innerText = `Välkommen ${user.username}!`;

  // Logga ut-knapp
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});


  // Toggle hamburger-meny
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  // Logga ut
  const logoutLink = document.getElementById("logout-link");
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });