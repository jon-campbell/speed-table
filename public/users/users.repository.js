(function() {
  angular
    .module("app")
    .factory("usersRepository", usersRepository);

  usersRepository.$inject = ["$http"];

  function usersRepository($http) {
    var repository = {
      getUser: getUser,
      getRepos: getRepos
    }

    return repository;

    ////////////

    function getUser(username) {
      return getHttpPromise("https://api.github.com/users/" + username);
    }

    function getRepos(repos_url) {
      return getHttpPromise(repos_url);
    }

    function getHttpPromise(url) {
      return $http
        .get(url)
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
