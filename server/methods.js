Meteor.methods({
  makeWeeklyReportData: function(userId) {
    const agg = Expenses.aggregate([
      {$match: {
        ownerId: userId
      }},
      {$group: {
        _id: {
          year: {$year: "$timestamp"},
          week: {$week: "$timestamp"},
        },
        total: { $sum: "$amount" },
        avg: { $avg: "$amount" }
      }}
    ]);
    const byWeek = _(agg).map(stats => {
      return {
        ...stats,
        ...stats._id,
        ownerId: userId,
        _id: userId + '-' + stats._id.year + '-' + stats._id.week,
      };
    });
    _(byWeek).forEach((week) => WeeklyReport.upsert(week._id, { $set: week }));
  },

  createExpense: function(exp) {
    if (Meteor.user()) {
      return Expenses.insert({
        ...exp,
        ownerId: Meteor.userId(),
        ownerName: Meteor.user().username
      });
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },

  updateExpense: function(modifier, id) {
    const expense = Expenses.findOne(id);
    if (!expense) {
      throw new Meteor.Error(404, "Not found, expense with id="+id);
    }
    if (expense.ownerId === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return Expenses.update(id, modifier);
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },

  deleteExpense: function(id) {
    const expense = Expenses.findOne(id);
    if (!expense) {
      throw new Meteor.Error(404, "Not found, expense with id="+id);
    }
    if (expense.ownerId === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Expenses.remove(id);
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },

  updateUser: function(mod, id) {
    const modifier = mod.$set; // TODO: this is very hacky way to avoid mongo query
    const user = Meteor.users.findOne(id);;
    if (Roles.userIsInRole(Meteor.userId(), ['admin','manager'])) {
      if ('username' in modifier) {
        Accounts.setUsername(id, modifier.username);
      }
      if ('roles' in modifier) {
        Roles.setUserRoles(id, modifier.roles);
      }
    } else if (user.id === Meteor.userId()) {
      if ('username' in modifier) {
        Accounts.setUsername(id, modifier.username);
      }
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },

  deleteUser: function(id) {
    const user = Meteor.user.findOne(id);;
    if (user.id === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ['admin','manager'])) {
      Meteor.user.remove(id);
        Roles.setUserRoles(id, []);
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
});

