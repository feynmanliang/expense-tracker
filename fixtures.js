Meteor.startup(() => {
  var user = Meteor.users.findOne({username: 'admin'})
  if (!user) {
    var userId = Accounts.createUser({
      username: 'admin',
      password: 'admin'
    });
    user = Meteor.users.findOne(userId);
  }
  Roles.addUsersToRoles(user._id, ['admin']);

})
