(function() {
  angular
    .module("app")
    .factory("usersRepository", usersRepository);

  usersRepository.$inject = ["$http"];

  function usersRepository($http) {
    var repository = {
      getUsers: getUsers,
      store: store
    }

    return repository;

    ////////////

    function getUsers() {
      return getHttpPromise("/user");
    };

    function store(user) {
      return postHttpPromise("/user", {name: user.name})
        .then(function (response) {
          if (response.status !== 201) {
            throw "User was not created";
          }
        });
    };

    function getHttpPromise(url) {
      return $http
        .get(url)
        .then(function(response) {
          return response.data;
        });
    };

    function postHttpPromise(url, body) {
      return $http.post(url, body);
    };
  };
})();
