// Populate from fixtures if initially empty
if (Expenses.find({}).count() == 0) {
  _.each(Fixtures.expenses, (expense) => {
    const expenseClean = Expenses.schema.clean(expense)
    Expenses.insert(expenseClean)
  })
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    Accounts.ui.config({
      passwordSignupFields: 'USERNAME_ONLY'
    })
  })
}
