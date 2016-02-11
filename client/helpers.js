Template.expenseList.onCreated(function () {
  this.subscribe("Users")
})

Template.insertExpenseForm.helpers({
  userId: () => Meteor.userId(),
  now: () => moment().toDate(),
  expenseData: function() {
    return Expenses.findOne({_id: FlowRouter.getParam('expenseId')});
  },
})

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
    Expenses.remove(this._id);
  }
});

Template.report.onCreated(function () {
  this.subscribe("WeeklyReport")
})

Template.updateUserCell.events({
  'click .update': function () {
    FlowRouter.go('/users/' + this._id);
  }
});

Template.updateUserForm.helpers({
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
