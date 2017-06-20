'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  'authService',
  userService,
];

function userService( $q, $log, $http, authService){

  let service = {};
  service.photos = [];

  service.fetchPhotos = () => {
    return authService.getToken()
    .then(token => {
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(`${__API_URL__}/api/user`, config);
    })
    .then(res => {
      $log.log('photos retrieved');
      service.photos = res.data.photos;
      return res.data.photos;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePhoto = (pic) => {
    return authService.getToken()
    .then(token => {
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(`${__API_URL__}/api/photo/${pic._id}`, config);
    })
    .then(res => {
      service.photos.filter((ele, i) => {
        if(ele._id === pic._id) service.photos.splice(i, 1);
      });
      return res;
    })
    .catch(err =>{
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
