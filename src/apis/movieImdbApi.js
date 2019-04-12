import env from '../env';
import request from 'request';

const movieApiUrl = 'https://api.themoviedb.org/3/movie';

const searchMovie = (uri) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      uri,
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });
}

const MovieApi = {
  getNowPlayingMovies: () => {
    return searchMovie(`${movieApiUrl}/now_playing?api_key=1b6d9c3a33ddf7223dfd66a4d06cf3a7&language=en-US`);
  },
}
module.exports = MovieApi;