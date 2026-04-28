document.addEventListener('DOMContentLoaded', () => {
    // --- MOBILE MENU LOGIC ---
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
        const prevBtn = gallery.querySelector('[data-gallery-prev]');
        const nextBtn = gallery.querySelector('[data-gallery-next]');
        const dotsWrap = gallery.querySelector('[data-gallery-dots]');

        let index = 0;
        let perView = window.innerWidth <= 900 ? 1 : 3;
        let maxIndex = Math.max(0, slides.length - perView);

        function updateGallery() {
            const move = index * (100 / perView);
            track.style.transform = `translateX(-${move}%)`;

            // Update dots state
            const dots = dotsWrap.querySelectorAll('.gallery-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function buildDots() {
            if (!dotsWrap) return;
            dotsWrap.innerHTML = '';
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

        // Event Listeners - INSIDE the gallery check to prevent null errors
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                index = index >= maxIndex ? 0 : index + 1;
                updateGallery();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                index = index <= 0 ? maxIndex : index - 1;
                updateGallery();
            });
        }

        // Handle window resizing
        window.addEventListener('resize', () => {
            const newPerView = window.innerWidth <= 900 ? 1 : 3;
            if (newPerView !== perView) {
                perView = newPerView;
                maxIndex = Math.max(0, slides.length - perView);
                if (index > maxIndex) index = maxIndex;
                buildDots();
                updateGallery();
            }
        });

        // Initialize gallery
        buildDots();
        updateGallery();
    }
});
