Expenses = new Mongo.Collection("expenses");
// Define the schema
Expenses.schema = new SimpleSchema({
  timestamp: {
    type: Date,
    label: "Timestamp",
  },
  description: {
    type: String,
    label: "Description",
    max: 200
  },
  amount: {
    type: Number,
    label: "Amount",
    decimal: true,
    min: 0
  },
  comment: {
    type: String,
    label: "Comment",
    optional: true,
    max: 1000
  }
});

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
