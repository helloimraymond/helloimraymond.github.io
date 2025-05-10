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
        '<span class="typewriter-chinese">世界, 你好!</span>',
        "MARHABA BIL-3ĀLAM!",
        "OLÁ MUNDO!",
        "M'ACH RHAESHESER!"
    ];
    const typeElem = document.getElementById("typewriter-text");
    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        // Special handling for the Chinese phrase with HTML
        if (currentPhrase.includes('typewriter-chinese')) {
            const match = currentPhrase.match(/<span[^>]*>(.*?)<\/span>/);
            const chineseText = match ? match[1] : '';
            if (typing) {
                if (charIndex < chineseText.length) {
                    typeElem.innerHTML = `<span class="typewriter-chinese">${chineseText.slice(0, charIndex + 1)}</span>`;
                    charIndex++;
                    setTimeout(typeLoop, 90);
                } else {
                    typing = false;
                    setTimeout(typeLoop, 1200);
                }
            } else {
                if (charIndex > 0) {
                    typeElem.innerHTML = `<span class="typewriter-chinese">${chineseText.slice(0, charIndex - 1)}</span>`;
                    charIndex--;
                    setTimeout(typeLoop, 40);
                } else {
                    typing = true;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeLoop, 400);
                }
            }
        }
        // Special handling for the Arabic phrase with HTML
        else if (currentPhrase.includes('typewriter-arabic')) {
            const match = currentPhrase.match(/<span[^>]*>(.*?)<\/span>/);
            const arabicText = match ? match[1] : '';
            if (typing) {
                if (charIndex < arabicText.length) {
                    typeElem.innerHTML = `<span class="typewriter-arabic">${arabicText.slice(0, charIndex + 1)}</span>`;
                    charIndex++;
                    setTimeout(typeLoop, 90);
                } else {
                    typing = false;
                    setTimeout(typeLoop, 1200);
                }
            } else {
                if (charIndex > 0) {
                    typeElem.innerHTML = `<span class="typewriter-arabic">${arabicText.slice(0, charIndex - 1)}</span>`;
                    charIndex--;
                    setTimeout(typeLoop, 40);
                } else {
                    typing = true;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeLoop, 400);
                }
            }
        }
        // Default behavior for non-HTML phrases
        else {
            if (typing) {
                if (charIndex < currentPhrase.length) {
                    typeElem.innerHTML = currentPhrase.slice(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeLoop, 90);
                } else {
                    typing = false;
                    setTimeout(typeLoop, 1200);
                }
            } else {
                if (charIndex > 0) {
                    typeElem.innerHTML = currentPhrase.slice(0, charIndex - 1);
                    charIndex--;
                    setTimeout(typeLoop, 40);
                } else {
                    typing = true;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(typeLoop, 400);
                }
            }
        }
    }

    if (typeElem) typeLoop();

    // Popup for bimaristan.png
    const img = document.getElementById('bimaristan-img');
    const popup = document.getElementById('bimaristan-popup');
    const closeBtn = document.getElementById('close-popup');

    if (img && popup && closeBtn) {
        img.addEventListener('click', function() {
            popup.style.display = 'flex';
            // Force reflow for transition
            void popup.offsetWidth;
            popup.classList.add('active');
        });
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('active');
        });
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
        // Hide popup after fade-out transition
        popup.addEventListener('transitionend', function() {
            if (!popup.classList.contains('active')) {
                popup.style.display = 'none';
            }
        });
    }
});