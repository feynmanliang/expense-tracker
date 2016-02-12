Meteor.startup(function() {
  // Disable login attempt rate limiting for our test users
  Accounts.removeDefaultRateLimit();

  var users = [
    {username:"admin", roles:['admin']},
    {username:"man", roles:['manager']},
    {username:"user", roles:[]}
  ];
  _.each(users, function (user) {
    if (Meteor.users.find({username: user.username}).count() == 0) {
      var id = Accounts.createUser({
        username: user.username,
        password: 'asdf'
      });
      if (user.roles && user.roles.length > 0) {
        Roles.addUsersToRoles(id, user.roles);
      }
      _.each(Fixtures.expenses, function(expense) {
        var cleanExpense = Expenses.schema.clean(_.extend(expense, { ownerId: id }));
        Expenses.insert(cleanExpense)
      });
    }
  });
});
