

<script>
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

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
  nextBtn.addEventListener('click', () => {
    index = index >= maxIndex ? 0 : index + 1;
    updateGallery();
  });

  prevBtn.addEventListener('click', () => {
    index = index <= 0 ? maxIndex : index - 1;
    updateGallery();
  });

  window.addEventListener('resize', () => {
    perView = window.innerWidth <= 900 ? 1 : 3;
    maxIndex = Math.max(0, slides.length - perView);
    buildDots();
    updateGallery();
  });

  // Initialize
  buildDots();
  updateGallery();
}

  function updateGallery() {
    const move = index * (100 / perView);
    track.style.transform = `translateX(-${move}%)`;
    
    // Update dots
    const dots = dotsWrap.querySelectorAll('.gallery-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
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
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = 'translateX(' + (slideWidth * index * -1) + 'px)';
      const dots = dotsWrap.querySelectorAll('.gallery-dot');
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === index);
      });
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === maxIndex;
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

  function handleContact() {
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const msg = document.getElementById('cf-msg').value.trim();
    if (!name || !email || !msg) {
      alert('Please fill in your name, email, and message.');
      return;
    }
    alert('Thank you, ' + name + '! Your message has been received. Rachel will be in touch within two business days.');
  }
</script>
