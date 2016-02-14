Meteor.publish('Expenses', function() {
  if (Roles.userIsInRole(this.userId, ['admin'])) {
    return Expenses.find({});
  } else {
    return Expenses.find({ownerId: this.userId});
  }
});

Meteor.publish('WeeklyReport', function() {
  return WeeklyReport.find({ ownerId : this.userId });
});

Meteor.publish('Users', function() {
  return Meteor.users.find({});
  if (Roles.userIsInRole(this.userId, ['admin', 'manager'])) {
    return Meteor.users.find({});
  } else {
    return Meteor.users.find(this.userId);
  }
});

Meteor.publishComposite("tabular_Expenses", function (tableName, ids, fields) {
  this.unblock();

  return {
    find: () => {
      this.unblock();

      if (Roles.userIsInRole(this.userId, ['admin'])) {
        return Expenses.find({});
      } else {
        return Expenses.find(
          {_id: {$in: ids}, ownerId: this.userId},
          {fields: fields});
      }
    },
    children: [
      {
        find: (expense) => {
          this.unblock(); // requires meteorhacks:unblock package
          return Meteor.users.find(
            {_id: expense.ownerId},
            {
              limit: 1,
              fields: {username: 1},
              sort: {username: 1}
            });
        }
      }
    ]
  };
});
