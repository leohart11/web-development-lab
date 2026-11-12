
// 1. LOADER
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("hidden");
    }, 500);
});


// 2. DARK MODE
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Товчны icon солих
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});


// 3. ӨМНӨХ THEME-ИЙГ САНАХ
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
} else {
    themeToggle.textContent = "🌙";
}


// 4. GALLERY CARD FOCUS
const cards = document.querySelectorAll(".gallery-card");

cards.forEach(function (card) {
    card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            card.classList.toggle("flipped");
        }
    });
});
