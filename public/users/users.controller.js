(function() {
  angular
    .module("app")
    .controller("usersController", usersController);

  usersController.$inject = ["usersRepository"];

  function usersController(usersRepository) {
    var viewModel = this;

    viewModel.title = "Runners";
    viewModel.getUsers = getUsers;

    activate();

    ///////////

    function activate() {
      getUsers();
    };

    function getUsers() {
      usersRepository
        .getUsers()
        .then(function(response) {
          viewModel.users = response;
        })
        .catch(function(response) {
          viewModel.users = [];
        });
    };
  };
})();
