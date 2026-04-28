document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE MENU LOGIC ---
    // Note: Your HTML uses a standard <ul> for nav-links. 
    // If you add a hamburger button later, this logic will be ready.
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // --- GALLERY LOGIC ---
    const gallery = document.querySelector('[data-gallery]');

    if (gallery) {
        const track = gallery.querySelector('.gallery-track');
        const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
        const prevBtn = document.querySelector('[data-gallery-prev]');
        const nextBtn = document.querySelector('[data-gallery-next]');
        const dotsWrap = document.querySelector('[data-gallery-dots]');

        let index = 0;
        // Adjust perView based on your CSS (3 for desktop, 1 for mobile)
        let perView = window.innerWidth <= 900 ? 1 : 3;
        let maxIndex = Math.max(0, slides.length - perView);

        function updateGallery() {
            if (!track) return;
            
            // Calculate movement based on percentage of the container
            const move = index * (100 / perView);
            track.style.transform = `translateX(-${move}%)`;

            // Update dots active state
            if (dotsWrap) {
                const dots = dotsWrap.querySelectorAll('.gallery-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        }

        function buildDots() {
            if (!dotsWrap) return;
            dotsWrap.innerHTML = '';
            // We only need dots for the possible "start" positions
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'gallery-dot';
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => {
                    index = i;
                    updateGallery();
                });
                dotsWrap.appendChild(dot);
            }
        }

        // Event Listeners for Navigation Buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (index >= maxIndex) {
                    index = 0; // Loop back to start
                } else {
                    index++;
                }
                updateGallery();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (index <= 0) {
                    index = maxIndex; // Loop to end
                } else {
                    index--;
                }
                updateGallery();
            });
        }

        // Handle window resizing to update items shown
        window.addEventListener('resize', () => {
            const newPerView = window.innerWidth <= 900 ? 1 : 3;
            if (newPerView !== perView) {
                perView = newPerView;
                maxIndex = Math.max(0, slides.length - perView);
                // Ensure index doesn't go out of bounds after resize
                if (index > maxIndex) index = maxIndex;
                buildDots();
                updateGallery();
            }
        });

        // Initialize
        buildDots();
        updateGallery();
    }
});

// --- CONTACT FORM LOGIC ---
function handleContact() {
    // Placeholder for form submission logic
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    
    if (!name || !email) {
        alert("Please fill out your name and email.");
        return;
    }
    
    console.log("Form submitted for:", name);
    alert("Thank you, Rachel will respond within two business days.");
}
