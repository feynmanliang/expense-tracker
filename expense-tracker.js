// Populate from fixtures if initially empty
if (Expenses.find({}).count() == 0) {
  _.each(Fixtures.expenses, (expense) => {
    const expenseClean = Expenses.schema.clean(expense)
    Expenses.insert(expenseClean)
  })
}


if (Meteor.isClient) {
  Template.expenseList.helpers({
    expenses: () => Expenses.find({}),
  })

  Template.updateExpenseForm.helpers({
    expenseData: function() {
      return Expenses.findOne({_id: FlowRouter.getParam('expenseId')});
    }
  })
}
