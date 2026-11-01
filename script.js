// GTFO Portfolio
const projects = [
  {
    id: 1,
    title: "Rocked Jewelry",
    category: "modeling",
    description: "Collection of 3D-modeled accessories — rings, necklaces, and bracelets.",
    image: "images/Jewelry_0001_10011.png",
    gallery: [
      "images/Jewelry_0000_10012.png",
      "images/Jewelry_0001_10011.png",
      "images/Jewelry_0002_10010.png",
      "images/Jewelry_0003_10009.png",
      "images/Jewelry_0004_10008.png",
      "images/Jewelry_0005_10007.png",
      "images/Jewelry_0006_10006.png",
      "images/Jewelry_0007_10005.png",
      "images/Jewelry_0008_10004.png",
      "images/Jewelry_0009_10003.png",
      "images/Jewelry_0010_10002.png",
      "images/Jewelry_0011_10013.png",
      "images/Jewelry_0012_Layer-1.png"
    ],
    tags: ["Jewelry", "Rings", "Necklaces"]
  },
  {
    id: 2,
    title: "Samurai Fight",
    category: "animation",
    description: "Sword fight animation inspired by Samurai Champloo.",
    image: "images/Jewelry_0001_10011.png",
    video: "videos/RUANDER.mp4",
    progress: ["videos/020001-0310.mp4", "videos/030001-0310.mp4"],
    tags: ["Animation", "Sword Fight"]
  },
  {
    id: 3,
    title: "POWER",
    category: "animation",
    description: "Character animation sequence. Final colored version and base flat pass.",
    image: "images/Jewelry_0001_10011.png",
    video: "videos/POWER.mp4",
    progress: ["videos/POWER-BASE.mp4"],
    tags: ["Animation", "Character"]
  },
  {
    id: 5,
    title: "Character Collection",
    category: "modeling",
    description: "Original character designs and development. Includes full-body models, outfit studies, and scene renders. Focus on stylized proportions, clothing detail, and expressive faces.",
    image: "images/characters/8.SKIE.png",
    gallery: [
      "images/characters/8.SKIE.png",
      "images/characters/6.CHASING 02.png",
      "images/characters/7.ELEVATOR.png",
      "images/characters/1.Hugo.png",
      "images/characters/2.Jack.png",
      "images/characters/3.Niki.png",
      "images/characters/4.Daniel.png",
      "images/characters/5.Clara.png"
    ],
    tags: ["Character", "Modeling", "Stylized", "Outfit"]
  },
  {
    id: 6,
    title: "Monster",
    category: "modeling",
    description: "Creature design and 360 turnaround. Includes base model, rig, and final clear render with detail close-ups.",
    image: "images/monster-face.png",
    video: "videos/monster-clear-360.mp4",
    progress: ["videos/monster-base-360.mp4", "videos/monster-rig-360.mp4"],
    gallery: [
      "images/monster-face.png",
      "images/monster-hands.png",
      "images/monster-spikes.png"
    ],
    mediaOrder: "video-first",
    tags: ["Creature", "Modeling", "Rig", "360"]
  }
];

const brands = [
  {
    name: "Bratz",
    logo: "images/brands/bratz-logo.png",
    description: "Animation work for Bratz."
  },
  {
    name: "Doll Haus of Dread",
    logo: "images/brands/dollhaus-logo.png",
    description: "Animation work for Jakks Pacific — Doll Haus of Dread."
  }
];

const grid = document.getElementById('projects-grid');
const brandsGrid = document.getElementById('brands-grid');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentMedia = [];
let currentIndex = 0;

function getCardMedia(project) {
  const media = [];
  if (project.mediaOrder === "video-first") {
    if (project.video) media.push({ type: 'video', src: project.video, label: 'Clear' });
    if (project.progress) {
      const labels = ["Base", "Rig"];
      project.progress.forEach((src, i) => media.push({ type: 'video', src, label: labels[i] || `Progress ${i + 1}` }));
    }
    if (project.gallery) project.gallery.forEach(src => media.push({ type: 'image', src }));
  } else {
    if (project.gallery) project.gallery.forEach(src => media.push({ type: 'image', src }));
    if (project.video) media.push({ type: 'video', src: project.video, label: 'Final' });
    if (project.progress) {
      const labels = ["Base", "Rig"];
      project.progress.forEach((src, i) => media.push({ type: 'video', src, label: labels[i] || `Progress ${i + 1}` }));
    }
  }
  if (!media.length && project.image) media.push({ type: 'image', src: project.image });
  return media;
}

function renderProjects(filter = 'all') {
  grid.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    const mediaList = getCardMedia(project);
    const hasMulti = mediaList.length > 1;
    let idx = 0;

    function renderCardMedia() {
      const item = mediaList[idx];
      let mediaEl = '';
      if (item.type === 'video') {
        mediaEl = `<video class="card-video" muted loop playsinline autoplay preload="metadata"><source src="${item.src}" type="video/mp4"></video>`;
      } else {
        mediaEl = `<img src="${item.src}" alt="${project.title}" loading="lazy" decoding="async">`;
      }
      const arrows = hasMulti
        ? `<button class="card-arrow prev" aria-label="Previous">‹</button><button class="card-arrow next" aria-label="Next">›</button><div class="card-counter">${idx + 1}/${mediaList.length}</div>`
        : '';
      card.querySelector('.img-wrap').innerHTML = mediaEl + arrows;
    }

    card.innerHTML = `
      <div class="img-wrap"></div>
      <div class="project-info">
        <div class="project-category">${project.category}</div>
        <h3>${project.title}</h3>
      </div>
    `;

    renderCardMedia();

    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-arrow')) return;
      openModal(project);
    });

    card.addEventListener('click', (e) => {
      const arrow = e.target.closest('.card-arrow');
      if (!arrow) return;
      e.stopPropagation();
      if (arrow.classList.contains('prev')) idx = (idx - 1 + mediaList.length) % mediaList.length;
      else idx = (idx + 1) % mediaList.length;
      renderCardMedia();
    });

    grid.appendChild(card);
  });
}

function renderBrands() {
  if (!brandsGrid) return;
  brandsGrid.innerHTML = '';
  brands.forEach(brand => {
    const div = document.createElement('div');
    div.className = 'brand-logo';
    div.innerHTML = `<img src="${brand.logo}" alt="${brand.name}" loading="lazy">`;
    brandsGrid.appendChild(div);
  });
}

function openModal(project) {
  currentMedia = getCardMedia(project);
  currentIndex = 0;
  renderMedia();
  const body = document.createElement('div');
  body.className = 'modal-body';
  body.innerHTML = `<h2>${project.title}</h2><div class="category">${project.category.toUpperCase()}</div><p>${project.description}</p>`;
  modalContent.appendChild(body);
  modal.classList.add('active');
}

function renderMedia() {
  if (!currentMedia.length) return;
  const item = currentMedia[currentIndex];
  const hasNav = currentMedia.length > 1;
  let mediaEl = item.type === 'video'
    ? `<video class="modal-media" controls autoplay muted loop preload="auto"><source src="${item.src}" type="video/mp4"></video>`
    : `<img class="modal-media" src="${item.src}" alt="" loading="lazy">`;
  const nav = hasNav ? `<button class="nav-btn prev" onclick="changeMedia(-1)">‹</button><button class="nav-btn next" onclick="changeMedia(1)">›</button><div class="media-counter">${currentIndex + 1} / ${currentMedia.length}${item.label ? ' · ' + item.label : ''}</div>` : '';
  modalContent.innerHTML = `<button class="modal-close" onclick="closeModal()">&times;</button><div class="media-viewer">${mediaEl}${nav}</div>`;
}

function changeMedia(dir) {
  currentIndex = (currentIndex + dir + currentMedia.length) % currentMedia.length;
  renderMedia();
}
function closeModal() { modal.classList.remove('active'); }
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
renderProjects();
renderBrands();

// Hero Slideshow — random shuffle on every refresh
// Only non-T-pose images. No videos.
const heroPool = [
  "images/characters/8.SKIE.png",
  "images/characters/6.CHASING 02.png",
  "images/characters/7.ELEVATOR.png",
  "images/Jewelry_0000_10012.png",
  "images/Jewelry_0001_10011.png",
  "images/Jewelry_0002_10010.png",
  "images/Jewelry_0003_10009.png",
  "images/Jewelry_0004_10008.png",
  "images/Jewelry_0005_10007.png",
  "images/Jewelry_0006_10006.png",
  "images/Jewelry_0007_10005.png",
  "images/Jewelry_0008_10004.png",
  "images/Jewelry_0009_10003.png",
  "images/Jewelry_0010_10002.png",
  "images/Jewelry_0011_10013.png",
  "images/Jewelry_0012_Layer-1.png",
  "images/monster-face.png",
  "images/monster-hands.png",
  "images/monster-spikes.png"
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const slideshow = document.getElementById('slideshow');
const dotsContainer = document.getElementById('hero-dots');
let slides = [];
let slideIndex = 0;
let slideInterval;

function buildHero() {
  const picked = shuffle(heroPool).slice(0, 5);
  slideshow.innerHTML = '';
  picked.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url('${src}')`;
    slideshow.appendChild(div);
  });
  slides = document.querySelectorAll('.slide');

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        showSlide(i);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });
  }
}

function showSlide(i) {
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  if (dotsContainer) {
    dotsContainer.querySelectorAll('.dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
  }
  slideIndex = i;
}

function nextSlide() {
  showSlide((slideIndex + 1) % slides.length);
}
function prevSlide() {
  showSlide((slideIndex - 1 + slides.length) % slides.length);
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 4500);
}

buildHero();

document.getElementById('hero-next').addEventListener('click', () => {
  nextSlide();
  resetInterval();
});
document.getElementById('hero-prev').addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

slideInterval = setInterval(nextSlide, 4500);
