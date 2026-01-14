document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    document.getElementById("welcomeText").textContent =
      `Välkommen ${user.username}`;
  }
});
