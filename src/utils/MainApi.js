class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
    }).then((res) => this._checkResponse(res));
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(movieID) {
    return fetch(`${this._baseUrl}/movies/${movieID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  saveUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

const mainApi = new MainApi({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'https://api.kateroshh.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
