// GTFO Portfolio
const projects = [
  {
    id: 1,
    title: "Rocked Jewelry",
    category: "modeling",
    description: "Collection of 3D-modeled accessories — rings, necklaces, and bracelets. Focus on hard-surface modeling, metal materials, and detailed surface work.",
    image: "images/Jewelry_0001_10011.png",
    gallery: [
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
    tags: ["Jewelry", "Rings", "Necklaces", "Bracelets", "Hard Surface"]
  },
  {
    id: 2,
    title: "Ruander",
    category: "animation",
    description: "Sword fight animation inspired by Samurai Champloo. Focus on timing, weight, and anime-style action. Includes early blocking, refined passes, and the final colored version.",
    image: "images/ruander-poster.jpg",
    video: "videos/RUANDER.mp4",
    progress: [
      "videos/020001-0310.mp4",
      "videos/030001-0310.mp4"
    ],
    tags: ["Animation", "Sword Fight", "Samurai Champloo", "Action"]
  },
  {
    id: 3,
    title: "Fiery Warrior",
    category: "animation",
    description: "Dynamic character animation of a fire-powered warrior in mid-leap. Focused on weight, energy, and expressive motion.",
    image: "imagine_images/3DvuR.jpg",
    tags: ["Character Animation", "Action", "3D"]
  },
  {
    id: 4,
    title: "Character Color Study",
    category: "coloring",
    description: "Digital painting color exploration focusing on skin tones, warm/cool contrast, and dramatic lighting.",
    image: "imagine_images/Pd4nM.jpg",
    tags: ["Digital Painting", "Color Theory", "Portrait"]
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
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" loading="lazy">
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
  if (project.progress) project.progress.forEach((src, i) => currentMedia.push({ type: 'video', src, label: `Progress ${i + 1}` }));
  if (currentMedia.length === 0 && project.image) currentMedia.push({ type: 'image', src: project.image });

  currentIndex = 0;
  renderMedia();

  const body = document.createElement('div');
  body.className = 'modal-body';
  body.innerHTML = `
    <h2>${project.title}</h2>
    <div class="category">${project.category.toUpperCase()}</div>
    <p>${project.description}</p>
    <div class="skills" style="margin-top: 1.5rem;">
      ${project.tags.map(tag => `<span class="skill">${tag}</span>`).join('')}
    </div>
  `;
  modalContent.appendChild(body);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function renderMedia() {
  if (!currentMedia.length) return;
  const item = currentMedia[currentIndex];
  const hasNav = currentMedia.length > 1;
  let mediaEl = item.type === 'video'
    ? `<video class="modal-media" controls autoplay muted loop><source src="${item.src}" type="video/mp4"></video>`
    : `<img class="modal-media" src="${item.src}" alt="">`;

  const nav = hasNav ? `
    <button class="nav-btn prev" onclick="changeMedia(-1)">‹</button>
    <button class="nav-btn next" onclick="changeMedia(1)">›</button>
    <div class="media-counter">${currentIndex + 1} / ${currentMedia.length}${item.label ? ' · ' + item.label : ''}</div>
  ` : '';

  modalContent.innerHTML = `
    <button class="modal-close" onclick="closeModal()">&times;</button>
    <div class="media-viewer">${mediaEl}${nav}</div>
  `;
}

function changeMedia(dir) {
  currentIndex = (currentIndex + dir + currentMedia.length) % currentMedia.length;
  renderMedia();
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

renderProjects();
