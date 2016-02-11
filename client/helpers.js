Template.expenseList.helpers({
  expenses: () => Expenses.find({}),
})

Template.insertExpenseForm.helpers({
  userId: () => Meteor.userId(),
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
