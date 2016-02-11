// Populate from fixtures if initially empty
var users = [
      {username:"admin", roles:['admin']},
      {username:"man", roles:['manager']},
      {username:"user"}
    ];
_.each(users, function (user) {
  var id;
  if (Meteor.users.find({username: user.username}).count() == 0) {
    id = Accounts.createUser({
      username: user.username,
      password: 'asdf'
    });

    if (user.roles.length > 0) {
      Roles.addUsersToRoles(id, user.roles);
    }
    _.each(Fixtures.expenses, (expense) => {
      const cleanExpense = Expenses.schema.clean(expense)
      Expenses.insert({
        ...cleanExpense,
        ownerId: id
      })
    });
  }
});

if (Meteor.isClient) {
  Meteor.startup(function() {
    Accounts.ui.config({
      passwordSignupFields: 'USERNAME_ONLY'
    })
  })
}
