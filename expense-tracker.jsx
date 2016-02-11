Expenses = new Mongo.Collection("expenses");

// Populate from fixtures if initially empty
if (Expenses.find({}).count() == 0) {
  _.each(Fixtures.expenses, (expense) => {
    Expenses.insert(expense)
  })
}


if (Meteor.isClient) {
  Meteor.startup(function() {
    React.render(<App />, document.getElementById("app"));
  })
}
