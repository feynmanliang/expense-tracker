Meteor.publish('Expenses', function() {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Expenses.find({});
  } else {
    return Expenses.find({ownerId: this.userId});
  }
});

Meteor.publish('WeekyReport', function() {
  return WeeklyReport.find({});
});

Meteor.publish('Users', function() {
  return Meteor.users.find({});
  if (Roles.userIsInRole(this.userId, ['admin', 'manager'])) {
    return Meteor.users.find({});
  } else {
    return Meteor.users.find(this.userId);
  }
});