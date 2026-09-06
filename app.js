const normalizeCategory = (value = '') => value.toLowerCase().trim().replace(/\s+/g, '');

const galleryCollections = {
  weddings: {
    title: 'Wedding Stories',
    description: 'A closer look at the details, portraits, and emotional moments from our wedding work.',
    images: [
      'mbole practical 2 - Copy.jpg',
      '2.jpg',
      '24.jpg',
      '1.jpg',
      'IMG_7863.JPG',
      'IMG_7878.JPG',
      'IMG_8110.jpg',
      'IMG_8120.jpg'
    ]
  },
  commercial: {
    title: 'Commercial & Brand Campaigns',
    description: 'Brand stories, polished product aesthetics, and dynamic visuals made for business impact.',
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  events: {
    title: 'Live Events',
    description: 'High-energy event coverage that captures the atmosphere, movement, and crowd emotion.',
    images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  birthday: {
    title: 'Birthday Moments',
    description: 'Bright celebrations and personal milestones captured with warmth and detail.',
    images: [
      'DSC_5852.JPG',
      'DSC_5854.JPG',
      '../DSC_5767.JPG',
      '../DSC_5772.JPG',
      '../DSC_5785.JPG',
      '../DSC_5819.JPG',
      'DSC_6008.JPG',
      'DSC_6025.JPG',
      'DSC_6028.JPG',
      'DSC_6029.JPG',
      'DSC_6030.JPG',
      '../DSC_6036.JPG',
      '../DSC_6037.JPG'
    ]
  },
  documentaries: {
    title: 'Documentary Frames',
    description: 'Natural storytelling with textured scenes and genuine human connection.',
    images: [
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200'
    ]
  }
};

function renderGalleryDetail() {
  const detailRoot = document.getElementById('gallery-detail-root');
  const detailTitle = document.getElementById('detail-title');
  const detailDescription = document.getElementById('detail-description');

  if (!detailRoot) return;

  const params = new URLSearchParams(window.location.search);
  const category = normalizeCategory(params.get('category') || 'weddings');
  const selectedGallery = galleryCollections[category] || galleryCollections.weddings;

  if (detailTitle) detailTitle.textContent = selectedGallery.title;
  if (detailDescription) detailDescription.textContent = selectedGallery.description;

  detailRoot.innerHTML = selectedGallery.images
    .map(
      (src) => `
        <figure class="gallery-card">
          <img src="${src}" alt="${selectedGallery.title} gallery image">
        </figure>
      `
    )
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.main-header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
    });

    document.querySelectorAll('.nav-link, .cta-nav').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleIcon.className = 'fa-solid fa-bars-staggered';
      });
    });
  }

  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach((item) => {
    item.setAttribute('tabindex', '0');

    const video = item.querySelector('.hovervideo');

    if (video) {
      item.addEventListener('mouseenter', () => {
        video.play().catch(() => {
          // The browser may block autoplay until the user interacts.
        });
      });

      item.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }

    item.addEventListener('click', () => {
      const category = normalizeCategory(item.dataset.category || 'weddings');
      if (!category) return;
      window.location.href = `gallery-detail.html?category=${encodeURIComponent(category)}`;
    });

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.grid-item');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const targetCategory = button.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');

        if (targetCategory === 'all' || normalizeCategory(itemCategory) === normalizeCategory(targetCategory)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  const magneticElements = document.querySelectorAll('.magnetic-target');

  if (window.innerWidth > 768) {
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - (rect.width / 2);
        const y = event.clientY - rect.top - (rect.height / 2);
        el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.02)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const submitBtn = bookingForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting Blueprint Details...';

      setTimeout(() => {
        alert('Success! Your creative data package has been staged. Beemedia 254 will execute operational contact within 12 hours.');
        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  renderGalleryDetail();
});