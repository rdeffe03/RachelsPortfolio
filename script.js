document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

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
            if (!track) return;
            const move = index * (100 / perView);
            track.style.transform = `translateX(-${move}%)`;
            const dots = dotsWrap ? dotsWrap.querySelectorAll('.gallery-dot') : [];
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }

        function buildDots() {
            if (!dotsWrap) return;
            dotsWrap.innerHTML = '';
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'gallery-dot';
                dot.addEventListener('click', () => { index = i; updateGallery(); });
                dotsWrap.appendChild(dot);
            }
        }

        if (nextBtn) nextBtn.addEventListener('click', () => {
            index = index >= maxIndex ? 0 : index + 1;
            updateGallery();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            index = index <= 0 ? maxIndex : index - 1;
            updateGallery();
        });

        window.addEventListener('resize', () => {
            perView = window.innerWidth <= 900 ? 1 : 3;
            maxIndex = Math.max(0, slides.length - perView);
            if (index > maxIndex) index = maxIndex;
            buildDots();
            updateGallery();
        });

        buildDots();
        updateGallery();
    }
});
