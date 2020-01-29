(function () {
  'use strict';

  let characterList = document.querySelector('.characters'),
    movieTitle = document.querySelector('.title'),
    openingCrawl = document.querySelector('.crawl'),
    moviePoster = document.querySelector('.poster'),
    episodeID = document.querySelector('.episode'),
    slugUrl,
    populateCharacters;


  const getPeople = async () => {
    const response = await fetch('https://swapi.co/api/people');
    const json = await response.json();
    let results = json.results;

    results.forEach(singleSlug => {
      let url_index = Math.floor(Math.random() * singleSlug.films.length);
      populateCharacters = `<li><a class="slug" href="#" data-film="${singleSlug.films[url_index]}">${singleSlug.name}</a></li>`;
      characterList.innerHTML += populateCharacters;
    });

    slugUrl = document.querySelectorAll('.slug');
    slugUrl.forEach(singleSlug => {
      singleSlug.addEventListener('click', function () {
        getMovie(singleSlug);
      });
    });
  };


  const getMovie = async (singleSlug) => {
    let url = singleSlug.dataset.film;
    const response = await fetch(url);
    const movieData = await response.json();
    console.log(movieData);


    episodeID.innerHTML = movieData.episode_id;
    movieTitle.innerHTML = movieData.title;
    openingCrawl.innerHTML = movieData.opening_crawl;
    moviePoster.innerHTML = `<img style="width:90%;" src="/images/${movieData.episode_id}.jpg" alt="${movieData.title} Movie Poster">`;
  };


  getPeople();


})();