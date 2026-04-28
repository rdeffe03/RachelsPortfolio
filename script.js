document.addEventListener('DOMContentLoaded', () => {
    // This makes sure the text is visible immediately
    document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));

    // Navigation scroll effect
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // Carousel / Gallery Logic
    const gallery = document.querySelector('[data-gallery]');
    if (gallery) {
        const track = gallery.querySelector('.gallery-track');
        const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
        const prevBtn = gallery.querySelector('[data-gallery-prev]');
        const nextBtn = gallery.querySelector('[data-gallery-next]');
        const dotsWrap = gallery.querySelector('[data-gallery-dots]');

        // Only run this if the buttons actually exist
        if (prevBtn && nextBtn) {
            let index = 0;
            let perView = window.innerWidth <= 900 ? 1 : 3;
            
            nextBtn.addEventListener('click', () => {
                // Your carousel movement code goes here
                console.log("Next clicked");
            });

            prevBtn.addEventListener('click', () => {
                // Your carousel movement code goes here
                console.log("Prev clicked");
            });
        }
    }
});
