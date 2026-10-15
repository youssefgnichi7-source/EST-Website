const players = [
  { name: "Amenallah Memmiche", position: "Gardien" },
  { name: "Montassar Essid", position: "Gardien" },
  { name: "Béchir Ben Saïd", position: "Gardien" },

  { name: "Raed Chikhaoui", position: "Défenseur" },
  { name: "Hamza Jelassi", position: "Défenseur" },
  { name: "Mohamed Dräger", position: "Défenseur" },
  { name: "Marouane Sahraoui", position: "Défenseur" },
  { name: "Mohamed Ali Ben Romdhane", position: "Défenseur" },

  { name: "Hamza Rafia", position: "Milieu" },
  { name: "Mohamed Belhadj-Mahmoud", position: "Milieu" },
  { name: "Abdramane Konaté", position: "Milieu" },
  { name: "Moez Hadj-Ali", position: "Milieu" },
  { name: "Jesús Castillo", position: "Milieu" },
  { name: "Lucas Ribeiro", position: "Milieu" },
  { name: "Achref Jabri", position: "Milieu" },
  { name: "Youssef Becha", position: "Milieu" },
  { name: "Chiheb Jebali", position: "Milieu" },

  { name: "Imad Faraj", position: "Attaquant" },
  { name: "Youcef Belaïli", position: "Attaquant" },
  { name: "Hazem Mastouri", position: "Attaquant" },
  { name: "Maël Monyebe", position: "Attaquant" }
];

const playersGrid = document.getElementById("players-grid");
const searchInput = document.getElementById("player-search");
const positionFilter = document.getElementById("position-filter");
const resultsCount = document.getElementById("results-count");

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase();
}

function renderPlayers() {
  const search = searchInput.value
    .trim()
    .toLocaleLowerCase("fr");

  const selectedPosition = positionFilter.value;

  const filteredPlayers = players.filter(player => {
    const matchesName = player.name
      .toLocaleLowerCase("fr")
      .includes(search);

    const matchesPosition =
      selectedPosition === "all" ||
      player.position === selectedPosition;

    return matchesName && matchesPosition;
  });

 if (filteredPlayers.length === 0) {
    playersGrid.innerHTML = `
        <p class="no-results">
            Aucun joueur trouvé.
        </p>
    `;
    resultsCount.textContent = "0 joueur trouvé";
    return;
}

  playersGrid.innerHTML = filteredPlayers.map(player => `
    <article class="player-card">
      <div class="player-top">
        <div class="player-avatar">
          ${getInitials(player.name)}
        </div>
        <div>
          <h3>${player.name}</h3>
          <p class="position">${player.position}</p>
        </div>
      </div>
      <span class="player-label">ESPERANCE SPORTIVE DE TUNIS</span>
    </article>
  `).join("");
}


// Recherche en temps réel
searchInput.addEventListener("input", renderPlayers);

// Filtrage par poste
positionFilter.addEventListener("change", renderPlayers);

// Menu mobile
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fermer le menu" : "Ouvrir le menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fermer le menu après avoir choisi une section
navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    menuToggle.textContent = "☰";
  });
});

// Année automatique dans le footer
document.getElementById("current-year").textContent =
  new Date().getFullYear();

// Afficher les joueurs au chargement
renderPlayers();
