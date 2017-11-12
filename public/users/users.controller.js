(function() {
  angular
    .module("app")
    .controller("usersController", usersController);

  usersController.$inject = ["usersRepository"];

  function usersController(usersRepository) {
    var viewModel = this;

    viewModel.title = "Github User Viewer";
    viewModel.getUser = getUser;

    activate();

    ///////////

    function activate() {
      viewModel.usernameInput = "angular";
      getUser();
    }

    function getUser() {
      let username = viewModel.usernameInput;
      usersRepository
        .getUser(username)
        .then(function(response) {
          viewModel.user = response;
          viewModel.usernameSearchError = null;
        })
        .catch(function(response) {
          viewModel.user = null;
          viewModel.usernameSearchError = response.data.message;
        })
        .then(function(response) {
          let reposUrl = viewModel.user.repos_url;
          usersRepository
            .getRepos(reposUrl)
            .then(function(response) {
              viewModel.user.repos = response;
            });
        });
    }

  }
})();
