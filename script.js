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

    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('nav ul');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    // Optional: close menu when a link is clicked
    document.querySelectorAll('nav ul a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Typewriter effect
    const phrases = [
        "HELLO WORLD!",
        "BONJOUR MONDE!",
        "¡HOLA MUNDO!",
        "世界, 你好!",
        "OLÁ MUNDO!",
        "RYTSAS VȲS!",
        "M'ACH RHAESHESER!"
    ];
    const typeElem = document.getElementById("typewriter-text");
    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];
        if (typing) {
            if (charIndex < currentPhrase.length) {
                typeElem.textContent += currentPhrase[charIndex];
                charIndex++;
                setTimeout(typeLoop, 90);
            } else {
                typing = false;
                setTimeout(typeLoop, 1200); // Pause before deleting
            }
        } else {
            if (charIndex > 0) {
                typeElem.textContent = currentPhrase.slice(0, charIndex - 1);
                charIndex--;
                setTimeout(typeLoop, 40);
            } else {
                typing = true;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeLoop, 400); // Pause before typing next
            }
        }
    }

    if (typeElem) typeLoop();
});