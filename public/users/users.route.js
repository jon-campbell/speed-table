(function() {
  angular
    .module("app")
    .config(["$routeProvider", config]);

  function config($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "users/users.html",
      controller: "usersController",
      controllerAs: "viewModel"
    });
  }
})();
