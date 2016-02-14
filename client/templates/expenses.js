Template.expenseList.events({
  'click .create': function(e) {
    e.preventDefault();
    FlowRouter.go('/expense/new');
  },
});

Template.createExpenseForm.helpers({
  now: () => moment().toDate(),
  userId: () => Meteor.userId()
})

Template.createExpenseForm.events({
  'click .cancel': function(e) {
    e.preventDefault();
    FlowRouter.go('/expense');
  }
});

Template.updateExpenseForm.helpers({
  expenseData: function() {
    return Expenses.findOne({_id: FlowRouter.getParam('expenseId')});
  },
})

Template.updateExpenseForm.events({
  'click .cancel': function(e) {
    e.preventDefault();
    FlowRouter.go('/expense');
  }
});

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
