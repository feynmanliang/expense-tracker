Template.userTable.onCreated(function () {
  this.subscribe("Users")
})
Template.userTable.helpers({
  tableSettings: function () {
    return {
      collection: Meteor.users,
      rowsPerPage: 25,
      showFilter: true,
      enableRegex: true,
      fields: [
        { key: 'username', label: 'Username' },
        { key: 'roles', label: 'Roles' },
        { key: 'tableControls', label: '', tmpl: Template.userTableControls },
      ],
      class: "ui table",
    };
  }
});
Template.userTableControls.events({
  'click .edit': function () {
    FlowRouter.go('/user/' + this._id);
  },
  'click .delete': function () {
    Meteor.call('deleteUser', this._id);
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
