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
    id: 5,
    title: "Character Collection",
    category: "modeling",
    description: "Original character designs and development. Includes full-body models, outfit studies, and scene renders. Focus on stylized proportions, clothing detail, and expressive faces.",
    image: "images/characters/1.Hugo.png",
    gallery: [
      "images/characters/1.Hugo.png",
      "images/characters/2.Jack.png",
      "images/characters/3.Niki.png",
      "images/characters/4.Daniel.png",
      "images/characters/5.Clara.png",
      "images/characters/6.CHASING 02.png",
      "images/characters/7.ELEVATOR.png",
      "images/characters/8.SKIE.png"
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
    tags: ["Creature", "Modeling", "Rig", "360"]
  }
];

const grid = document.getElementById('projects-grid');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentMedia = [];
let currentIndex = 0;

function renderProjects(filter = 'all') {
  grid.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    let media = '';
    if (project.video) {
      media = `<video class="card-video" muted loop playsinline autoplay><source src="${project.video}" type="video/mp4"></video>`;
    } else {
      media = `<img src="${project.image}" alt="${project.title}">`;
    }

    card.innerHTML = `
      <div class="img-wrap">${media}</div>
      <div class="project-info">
        <div class="project-category">${project.category}</div>
        <h3>${project.title}</h3>
      </div>
    `;
    card.addEventListener('click', () => openModal(project));
    grid.appendChild(card);
  });
}

function openModal(project) {
  currentMedia = [];
  if (project.gallery) project.gallery.forEach(src => currentMedia.push({ type: 'image', src }));
  if (project.video) currentMedia.push({ type: 'video', src: project.video, label: 'Final' });
  if (project.progress) {
    const labels = ["Base", "Rig"];
    project.progress.forEach((src, i) => currentMedia.push({ type: 'video', src, label: labels[i] || `Progress ${i + 1}` }));
  }
  if (!currentMedia.length && project.image) currentMedia.push({ type: 'image', src: project.image });
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
    ? `<video class="modal-media" controls autoplay muted loop><source src="${item.src}" type="video/mp4"></video>`
    : `<img class="modal-media" src="${item.src}" alt="">`;
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
const slides = document.querySelectorAll('.slide');
let slideIndex = 0;
if (slides.length) setInterval(() => {
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}, 4000);
