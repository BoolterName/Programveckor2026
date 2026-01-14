// HAMBURGER-MENY & LOGGA UT
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const logoutLink = document.getElementById("logout-link");

// Toggle meny
menuBtn.addEventListener("click", () => {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Stäng meny om klick utanför
document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.style.display = "none";
    }
});


logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});
