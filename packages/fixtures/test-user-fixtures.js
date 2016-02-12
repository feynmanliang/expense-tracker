function createUser(name, pass) {
  User = {}
  User.login = function(callback) {
    if (!Meteor.user()) {
      Meteor.loginWithPassword(name, pass, function(err) {
        if (err) {
          console.log('Login error: ' + err);
          callback && callback(err);
        } else {
          callback && callback(undefined);
        }
      });
    }
  }
  User.logout = function() {
    if (Meteor.user()) {
      Meteor.logout();
    }
  }
  return User;
}

TestUsers = {
  admin: createUser('admin', 'asdf'),
  manager: createUser('man', 'asdf'),
  user: createUser('user', 'asdf'),
}
