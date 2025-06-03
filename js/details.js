document.addEventListener('DOMContentLoaded', () => {
  const serie = JSON.parse(localStorage.getItem('series-details'));

  if (!serie) {
    document.body.innerHTML = `<p style="color:red; text-align:center;">Aucune donnée trouvée. Revenez à la page d'accueil.</p>`;
    return;
  }

  // Mise à jour des contenus texte/image
  document.getElementById('title').textContent = serie.name;
  document.getElementById('poster').src = `https://image.tmdb.org/t/p/w500${serie.backdrop_path}`;
  document.getElementById('poster').alt = serie.name;
  document.getElementById('overview').textContent = serie.overview;

  
});
