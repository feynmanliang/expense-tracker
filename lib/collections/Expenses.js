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
Expenses.helpers({
  owner: function() {
    return Meteor.users.findOne(this.ownerId);
  },
  ownerName: function() {
    const match = Meteor.users.findOne(this.ownerId);
    return match ? match.username : 'n/a';
  }
});
