Expenses = new Mongo.Collection("expenses");
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
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
});
Expenses.attachSchema(Expenses.schema);

