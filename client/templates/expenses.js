Template.expenseTable.events({
  'click .create': function(e) {
    e.preventDefault();
    FlowRouter.go('/expense/new');
  },
});
Template.expenseTable.onCreated(function() {
  this.subscribe('Expenses');
});
Template.expenseTable.helpers({
  tableSettings: () => {
    return {
      collection: Expenses,
      rowsPerPage: 25,
      showFilter: true,
      enableRegex: true,
      fields: [
        { key: 'ownerName', label: 'Owner' },
        { key: 'timestamp', label: 'Date/Time' },
        { key: 'amount', label: 'Amount' },
        { key: 'description', label: 'Description' },
        { key: 'comment', label: 'Comment' },
        { key: 'tableControls', label: '', tmpl: Template.expenseTableControls },
      ],
      class: "ui celled table",
    };
  }
});
Template.expenseTableControls.events({
  'click .edit': function () {
    FlowRouter.go('/expense/' + this._id);
  },
  'click .delete': function () {
    Meteor.call('deleteExpense', this._id);
  }
});

AutoForm.addHooks('createExpenseForm', { onSuccess: () => FlowRouter.go('/expense'), });
Template.createExpenseForm.helpers({
  now: () => moment().toDate(),
  userId: () => Meteor.userId(),
  userName: () => Meteor.user().username,
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
