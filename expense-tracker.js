// Populate from fixtures if initially empty
if (Meteor.isServer) {
  var users = [
    {username:"admin", roles:['admin']},
    {username:"man", roles:['manager']},
    {username:"user", roles:[]}
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
        const cleanExpense = Expenses.schema.clean({
          ...expense,
          ownerId: id
        })
        Expenses.insert(cleanExpense)
      });
    }
  });
}

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  })

  Accounts.onLogin(() => {
    const redirect = Session.get('redirectAfterLogin');
    if (redirect && redirect !== '/') {
      FlowRouter.go(redirect);
    }
  });

  Accounts.onLogout(() => {
    FlowRouter.go('welcome');
  });
}
