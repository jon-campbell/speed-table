(function() {
  angular
    .module("app")
    .factory("usersRepository", usersRepository);

  usersRepository.$inject = ["$http"];

  function usersRepository($http) {
    var repository = {
      getUsers: getUsers
    }

    return repository;

    ////////////

    function getUsers() {
      return getHttpPromise("/user");
    };

    function getHttpPromise(url) {
      return $http
        .get(url)
        .then(function(response) {
          return response.data;
        });
    };
  };
})();
