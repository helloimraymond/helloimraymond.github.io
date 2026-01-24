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
        "HELLO WORLD",
        "BONJOUR, LE MONDE",
        "HOLA MUNDO",
        /*'<span class="typewriter-chinese">世界, 你好</span>', */
        /*"世界, 你好",*/
        /*"MARHABA BIL-3ĀLAM!",*/
        "OLÁ MUNDO",
        /*"M'ACH RHAESHESER!"
        "HALLO, WERELD",
        "HALO, DUNIA",
        "AHOJ SVĚTE",*/
        "MERHABA DÜNYA",
        /*"SALOM DUNYO",*/
        "KALTXÌ, MA EYWA"
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
    let bimaristanZoomLevel = 1;
    let bimaristanPanX = 0;
    let bimaristanPanY = 0;
    let bimaristanIsDragging = false;
    let bimaristanStartX, bimaristanStartY;

    const img = document.getElementById('bimaristan-img');
    const popup = document.getElementById('bimaristan-popup');
    const closeBtn = document.getElementById('close-popup');

    if (img && popup && closeBtn) {
        img.addEventListener('click', function() {
            const popupImg = popup.querySelector('img');
            // Reset zoom and pan
            bimaristanZoomLevel = 1;
            bimaristanPanX = 0;
            bimaristanPanY = 0;
            popupImg.style.transform = `scale(${bimaristanZoomLevel}) translate(${bimaristanPanX}px, ${bimaristanPanY}px)`;
            popupImg.style.cursor = 'zoom-in';
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

    // Zoom and pan for bimaristan popup
    if (popup) {
        const bimaristanPopupImg = popup.querySelector('img');
        if (bimaristanPopupImg) {
            bimaristanPopupImg.addEventListener('wheel', (e) => {
                e.preventDefault();
                const zoomFactor = 0.1;
                if (e.deltaY < 0) {
                    bimaristanZoomLevel = Math.min(bimaristanZoomLevel + zoomFactor, 5);
                } else {
                    bimaristanZoomLevel = Math.max(bimaristanZoomLevel - zoomFactor, 1);
                }
                bimaristanPopupImg.style.transform = `scale(${bimaristanZoomLevel}) translate(${bimaristanPanX}px, ${bimaristanPanY}px)`;
                bimaristanPopupImg.style.cursor = bimaristanZoomLevel > 1 ? 'grab' : 'zoom-in';
            });

            bimaristanPopupImg.addEventListener('mousedown', (e) => {
                if (bimaristanZoomLevel > 1) {
                    bimaristanIsDragging = true;
                    bimaristanStartX = e.clientX - bimaristanPanX;
                    bimaristanStartY = e.clientY - bimaristanPanY;
                    bimaristanPopupImg.style.cursor = 'grabbing';
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (bimaristanIsDragging && bimaristanZoomLevel > 1) {
                    bimaristanPanX = e.clientX - bimaristanStartX;
                    bimaristanPanY = e.clientY - bimaristanStartY;
                    bimaristanPopupImg.style.transform = `scale(${bimaristanZoomLevel}) translate(${bimaristanPanX}px, ${bimaristanPanY}px)`;
                }
            });

            document.addEventListener('mouseup', () => {
                bimaristanIsDragging = false;
                if (bimaristanPopupImg) {
                    bimaristanPopupImg.style.cursor = bimaristanZoomLevel > 1 ? 'grab' : 'zoom-in';
                }
            });

            bimaristanPopupImg.addEventListener('dragstart', (e) => {
                e.preventDefault();
            });
        }
    }

    // Popup for sperm-final.png
    let spermZoomLevel = 1;
    let spermPanX = 0;
    let spermPanY = 0;
    let spermIsDragging = false;
    let spermStartX, spermStartY;

    const spermImg = document.getElementById('sperm-img');
    const spermPopup = document.getElementById('sperm-popup');
    const closeSpermBtn = document.getElementById('close-sperm-popup');

    if (spermImg && spermPopup && closeSpermBtn) {
        spermImg.addEventListener('click', function() {
            const popupImg = spermPopup.querySelector('img');
            popupImg.src = spermImg.src; // Always use the hero image
            // Reset zoom and pan
            spermZoomLevel = 1;
            spermPanX = 0;
            spermPanY = 0;
            popupImg.style.transform = `scale(${spermZoomLevel}) translate(${spermPanX}px, ${spermPanY}px)`;
            popupImg.style.cursor = 'zoom-in';
            spermPopup.style.display = 'flex';
            void spermPopup.offsetWidth;
            spermPopup.classList.add('active');
        });
        closeSpermBtn.addEventListener('click', function() {
            spermPopup.classList.remove('active');
        });
        spermPopup.addEventListener('click', function(e) {
            if (e.target === spermPopup) {
                spermPopup.classList.remove('active');
            }
        });
        // Hide popup after fade-out transition
        spermPopup.addEventListener('transitionend', function() {
            if (!spermPopup.classList.contains('active')) {
                spermPopup.style.display = 'none';
            }
        });
    }

    // Zoom and pan for sperm popup
    if (spermPopup) {
        const spermPopupImg = spermPopup.querySelector('img');
        if (spermPopupImg) {
            spermPopupImg.addEventListener('wheel', (e) => {
                e.preventDefault();
                const zoomFactor = 0.1;
                if (e.deltaY < 0) {
                    spermZoomLevel = Math.min(spermZoomLevel + zoomFactor, 5);
                } else {
                    spermZoomLevel = Math.max(spermZoomLevel - zoomFactor, 1);
                }
                spermPopupImg.style.transform = `scale(${spermZoomLevel}) translate(${spermPanX}px, ${spermPanY}px)`;
                spermPopupImg.style.cursor = spermZoomLevel > 1 ? 'grab' : 'zoom-in';
            });

            spermPopupImg.addEventListener('mousedown', (e) => {
                if (spermZoomLevel > 1) {
                    spermIsDragging = true;
                    spermStartX = e.clientX - spermPanX;
                    spermStartY = e.clientY - spermPanY;
                    spermPopupImg.style.cursor = 'grabbing';
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (spermIsDragging && spermZoomLevel > 1) {
                    spermPanX = e.clientX - spermStartX;
                    spermPanY = e.clientY - spermStartY;
                    spermPopupImg.style.transform = `scale(${spermZoomLevel}) translate(${spermPanX}px, ${spermPanY}px)`;
                }
            });

            document.addEventListener('mouseup', () => {
                spermIsDragging = false;
                if (spermPopupImg) {
                    spermPopupImg.style.cursor = spermZoomLevel > 1 ? 'grab' : 'zoom-in';
                }
            });

            spermPopupImg.addEventListener('dragstart', (e) => {
                e.preventDefault();
            });
        }
    }

    // Hide scroll-down arrow on scroll
    const scrollArrow = document.querySelector('.scroll-down-arrow');
    if (scrollArrow) {
        function hideArrowOnScroll() {
            scrollArrow.style.opacity = '0';
            scrollArrow.style.pointerEvents = 'none';
        }
        window.addEventListener('scroll', hideArrowOnScroll, { once: true });
    }

    // Portfolio popup
    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX, startY;

    document.querySelectorAll('.layer').forEach(layer => {
        layer.onclick = () => {
            const popup = document.getElementById('portfolio-popup');
            const mainImage = document.getElementById('main-popup-image');
            const thumbnailsContainer = document.getElementById('popup-thumbnails');

            // Reset zoom and pan when opening popup
            zoomLevel = 1;
            panX = 0;
            panY = 0;
            mainImage.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;

            // Get the images for the gallery
            const galleryImages = layer.getAttribute('data-gallery').split(',');

            // Set the main image to the first image in the gallery
            mainImage.src = galleryImages[0];

            // Clear existing thumbnails
            thumbnailsContainer.innerHTML = '';

            // Add thumbnails to the popup
            galleryImages.forEach(imageSrc => {
                const thumbnail = document.createElement('img');
                thumbnail.src = imageSrc.trim();
                thumbnail.alt = 'Thumbnail';
                thumbnail.onclick = () => {
                    mainImage.src = imageSrc.trim(); // Update the main image when a thumbnail is clicked
                    // Reset zoom and pan when changing image
                    zoomLevel = 1;
                    panX = 0;
                    panY = 0;
                    mainImage.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
                    mainImage.style.cursor = 'zoom-in';
                };
                thumbnailsContainer.appendChild(thumbnail);
            });

            // Show the popup
            popup.style.display = 'flex';
            void popup.offsetWidth; // Force reflow
            popup.classList.add('active');
        };
    });

    // Prevent default drag behavior on the image
    document.getElementById('main-popup-image').addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
    document.getElementById('main-popup-image').addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomFactor = 0.1;
        if (e.deltaY < 0) {
            zoomLevel = Math.min(zoomLevel + zoomFactor, 5); // Max zoom 5x
        } else {
            zoomLevel = Math.max(zoomLevel - zoomFactor, 1); // Min zoom 1x
        }
        const img = document.getElementById('main-popup-image');
        img.style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
        img.style.cursor = zoomLevel > 1 ? 'grab' : 'zoom-in';
    });

    // Pan functionality with mouse drag
    document.getElementById('main-popup-image').addEventListener('mousedown', (e) => {
        if (zoomLevel > 1) {
            isDragging = true;
            startX = e.clientX - panX;
            startY = e.clientY - panY;
            document.getElementById('main-popup-image').style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && zoomLevel > 1) {
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            document.getElementById('main-popup-image').style.transform = `scale(${zoomLevel}) translate(${panX}px, ${panY}px)`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        const img = document.getElementById('main-popup-image');
        img.style.cursor = zoomLevel > 1 ? 'grab' : 'zoom-in';
    });

    // Close the popup
    document.getElementById('close-portfolio-popup').onclick = () => {
        const popup = document.getElementById('portfolio-popup');
        
        // Stop video playback immediately
        const video = popup.querySelector('#main-popup-video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
        
        // Stop iframe playback immediately by clearing src
        const iframe = popup.querySelector('iframe');
        if (iframe) {
            const oldSrc = iframe.src;
            iframe.src = '';
            iframe.src = oldSrc; // Reset src to stop playback
        }
        
        popup.classList.remove('active');
    };

    // Hide popup after fade-out transition
    const portfolioPopup = document.getElementById('portfolio-popup');
    portfolioPopup.addEventListener('transitionend', function () {
        if (!portfolioPopup.classList.contains('active')) {
            portfolioPopup.style.display = 'none';
        }
    });
});
