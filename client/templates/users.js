Template.userList.onCreated(function () {
  this.subscribe("Users")
})
Template.userList.helpers({
  tableSettings: function () {
    return {
      collection: Meteor.users,
      rowsPerPage: 25,
      showFilter: true,
      enableRegex: true,
      fields: [
        { key: 'username', label: 'Username' },
        { key: 'roles', label: 'Roles' },
      ],
      class: "ui celled table",
    };
  }
});

Template.updateUserForm.onCreated(function () {
  this.subscribe("Users")
})
AutoForm.addHooks('updateUserForm', { onSuccess: () => FlowRouter.go('/user'), });
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
Template.updateUserForm.events({
  'click .cancel': function(e) {
    e.preventDefault();
    FlowRouter.go('/user');
  }
});

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

