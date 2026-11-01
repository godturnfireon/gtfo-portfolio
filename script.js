// GTFO Portfolio
const projects = [
  { id: 1, title: "Rocked Jewelry", category: "modeling", description: "Collection of 3D-modeled accessories.", image: "images/Jewelry_0001_10011.png", gallery: ["images/Jewelry_0001_10011.png"], tags: ["Jewelry"] },
  { id: 2, title: "Ruander", category: "animation", description: "Sword fight inspired by Samurai Champloo.", image: "images/ruander-poster.jpg", video: "videos/RUANDER.mp4", tags: ["Animation"] }
];
const grid = document.getElementById('projects-grid');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
function renderProjects(filter = 'all') {
  grid.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  filtered.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `<img src="${project.image}" alt="${project.title}"><div class="project-info"><h3>${project.title}</h3></div>`;
    card.addEventListener('click', () => openModal(project));
    grid.appendChild(card);
  });
}
function openModal(project) {
  modalContent.innerHTML = `<button class="modal-close" onclick="closeModal()">&times;</button><img class="modal-media" src="${project.image}" alt=""><div class="modal-body"><h2>${project.title}</h2><p>${project.description}</p></div>`;
  modal.classList.add('active');
}
function closeModal() { modal.classList.remove('active'); }
renderProjects();
