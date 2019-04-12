import env from '../env';
import request from 'request';

const museumApiUrl = 'https://api.harvardartmuseums.org';

const getArts = (uri) => {
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

const MuseumApi = {
  getAllArts: () => {
    return getArts(`${museumApiUrl}/object?size=300&page=1000&apikey=8c12f9c0-df7d-11e8-a8d2-4b9ce5f2fce9`);
  },
}
module.exports = MuseumApi;