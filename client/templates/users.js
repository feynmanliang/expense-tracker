Template.userList.onCreated(function () {
  this.subscribe("Users")
})

Template.updateUserForm.onCreated(function () {
  this.subscribe("Users")
})

AutoForm.addHooks('updateUserForm', { onSuccess: () => FlowRouter.go('/user'), });

Template.updateUserCell.events({
  'click .update': function () {
    FlowRouter.go('/user/' + this._id);
  }
});


Template.deleteUserCell.events({
  'click .delete': function () {
    Meteor.call('deleteUser', this._id);
  }
});

Template.updateUserForm.events({
  'click .cancel': function(e) {
    e.preventDefault();
    FlowRouter.go('/user');
  }
});

Template.updateUserForm.helpers({
  roleOptions: function() {
    return {
      admin: "Admin",
      manager: "Manager",
    };
  },
  userData: function() {
    return Meteor.users.findOne(FlowRouter.getParam("userId"));
  }
});
