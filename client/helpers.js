Template.expenseList.onCreated(function () {
  this.subscribe("Users")
})

Template.expenseList.events({
  'click .create': function(e) {
    e.preventDefault();
    FlowRouter.go('/expense/new');
  },
});

Template.createExpenseForm.helpers({
  userId: () => Meteor.userId(),
  now: () => moment().toDate(),
})

Template.createExpenseForm.events({
  'click .cancel': function(e) {
    e.preventDefault();
    FlowRouter.go('/expense');
  }
});

Template.updateExpenseForm.events({
  'click .cancel': function(e) {
    e.preventDefault();
    FlowRouter.go('/expense');
  }
});

Template.updateExpenseForm.helpers({
  userId: () => Meteor.userId(),
  expenseData: function() {
    return Expenses.findOne({_id: FlowRouter.getParam('expenseId')});
  },
})

Template.updateExpenseForm.onCreated(function () {
  this.subscribe("Expenses")
})

Template.updateExpenseCell.events({
  'click .update': function () {
    FlowRouter.go('/expense/' + this._id);
  }
});

Template.deleteExpenseCell.events({
  'click .delete': function () {
    Meteor.call('deleteExpense', this._id);
  }
});

Template.report.onCreated(function () {
  this.subscribe("WeeklyReport")
})

Template.updateUserCell.events({
  'click .update': function () {
    FlowRouter.go('/user' + this._id);
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

Template.userList.onCreated(function () {
  this.subscribe("Users")
})

Template.updateUserForm.onCreated(function () {
  this.subscribe("Users")
})
