(function() {
  angular
    .module("app")
    .controller("usersController", usersController);

  usersController.$inject = ["usersRepository"];

  function usersController(usersRepository) {
    var viewModel = this;

    viewModel.user = { name: "" };

    viewModel.title = "Runners";
    viewModel.getUsers = getUsers;
    viewModel.addUser = addUser;

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

    function addUser(user) {
      if (!user.name) {
        alert("Username required");
        return;
      }
      usersRepository
        .store(user)
        .then(function (response) {
          viewModel.getUsers();
        })
        .catch(function (response) {
          alert("Error creating user");
        });
    };
  };
})();
