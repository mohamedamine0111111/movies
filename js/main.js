const filters = document.querySelectorAll('[data-tv]');
const container = document.querySelector('.series-container');

const API_KEY = '6631e5f1dc96088e0d26b86da29b5b6a';
const BASE_URL = 'https://api.themoviedb.org/3/tv';

const clearContainer = () => {
  container.innerHTML = '';
};

const renderCard = (serie) => `
  <div class="series-card" data-id="${serie.id}">
    <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" alt="${serie.name}">
    <div class="series-info">
      <h2>${serie.name}</h2>
      <div class="rating">${serie.vote_average} / 10</div>
    </div>
  </div>
`;

const fetchAndDisplaySeries = async (category) => {
  try {
    const res = await fetch(`${BASE_URL}/${category}?api_key=${API_KEY}&language=fr`);
    const { results } = await res.json();
    clearContainer();
    results.forEach(serie => {
      container.insertAdjacentHTML('beforeend', renderCard(serie));
    });
  } catch (err) {
    console.error("Erreur lors du chargement :", err);
  }
};

const fetchSeriesDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}?api_key=${API_KEY}&language=fr`);
  const data = await res.json();
  localStorage.setItem('series-details', JSON.stringify(data));
  window.open('details.html', '_blank');
};

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    fetchAndDisplaySeries(btn.dataset.tv);
  });
});

container.addEventListener('click', (e) => {
  const card = e.target.closest('.series-card');
  if (card) {
    fetchSeriesDetails(card.dataset.id);
  }
});

fetchAndDisplaySeries('top_rated');
