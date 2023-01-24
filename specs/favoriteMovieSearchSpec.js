/* eslint-disable no-tabs */
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-movies/favorite-movie-search-presenter';
import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';

describe('Searching movies', () => {
  let presenter;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setMovieSearchContainer = () => {
    document.body.innerHTML = `
		<div id="movie-search-container">
			<input id="query" type="text">
			<div class="movie-result-container">
				<ul class="movies">
				</ul>
			</div>
	  	</div>
		`;
  };

  const constructPresenter = () => {
    spyOn(FavoriteMovieIdb, 'searchMovies');
    presenter = new FavoriteMovieSearchPresenter({
      favoriteMovies: FavoriteMovieIdb,
    });
  };

  beforeEach(() => {
    setMovieSearchContainer();
    constructPresenter();
  });

  it('Should be able to capture the query typed by the user', () => {
    searchMovies('film a');
    expect(presenter.latestQuery).toEqual('film a');
  });

  it('Should ask the model to search for liked movies', () => {
    searchMovies('film a');
    expect(FavoriteMovieIdb.searchMovies).toHaveBeenCalledWith('film a');
  });
});
