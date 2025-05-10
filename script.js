window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "none"; // Hide the loading screen once the page has loaded
});

document.addEventListener("DOMContentLoaded", () => {
    const fadeInElements = document.querySelectorAll(".fade-in");

    const handleScroll = () => {
        fadeInElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.classList.add("visible");
            }
        });
    };

    // Trigger fade-in on scroll
    window.addEventListener("scroll", handleScroll);

    // Trigger fade-in on page load
    handleScroll();
});