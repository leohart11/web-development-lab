
/* 1. LOADER */
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("hidden");
    }, 500);
});


/* 2. DARK MODE */
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    const currentTheme = document.body.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-bs-theme", newTheme);

    if (newTheme === "dark") {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});


/* 3. ӨМНӨХ THEME-ИЙГ САНАХ */
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.setAttribute("data-bs-theme", "dark");
    themeToggle.textContent = "☀️";
} else {
    document.body.setAttribute("data-bs-theme", "light");
    themeToggle.textContent = "🌙";
}


/* 4. GALLERY CARD FOCUS */
const cards = document.querySelectorAll(".gallery-card");

cards.forEach(function (card) {
    card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            card.classList.toggle("flipped");
        }
    });
});


/* 5. BOOTSTRAP FORM VALIDATION */
const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!feedbackForm.checkValidity()) {
        event.stopPropagation();
    } else {
        document.getElementById("formMessage").textContent =
            "Санал хүсэлт амжилттай илгээгдлээ.";

        feedbackForm.reset();
        feedbackForm.classList.remove("was-validated");
        return;
    }

    feedbackForm.classList.add("was-validated");
});
