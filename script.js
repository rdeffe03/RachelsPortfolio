// Wrap your existing gallery logic in a window load event
window.addEventListener('load', () => {
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

    function buildDots() {
      dotsWrap.innerHTML = '';
      for (let i = 0; i <= maxIndex; i += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gallery-dot';
        dot.addEventListener('click', () => {
          index = i;
          updateGallery();
        });
        dotsWrap.appendChild(dot);
      }
    }

    function updateGallery() {
      // Now slideWidth will be accurately calculated
      const slideWidth = slides[0].offsetWidth; 
      track.style.transform = `translateX(${-index * slideWidth}px)`;
      
      const dots = dotsWrap.querySelectorAll('.gallery-dot');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= maxIndex;
    }

    function syncGallery() {
      perView = window.innerWidth <= 900 ? 1 : 3;
      maxIndex = Math.max(0, slides.length - perView);
      index = Math.min(index, maxIndex);
      buildDots();
      updateGallery();
    }

    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateGallery();
    });

    nextBtn.addEventListener('click', () => {
      index = Math.min(maxIndex, index + 1);
      updateGallery();
    });

    window.addEventListener('resize', syncGallery);
    syncGallery();
  }
});
