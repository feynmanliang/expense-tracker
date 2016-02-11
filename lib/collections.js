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
  amount: { type: Number,
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
    return Meteor.users.findOne(this.ownerId).username;
  }
});

Meteor.users.schema= new SimpleSchema({
    username: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Meteor.users.schema);

WeeklyReport = new Mongo.Collection('weeklyReport');
