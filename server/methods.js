Meteor.methods({
  makeWeeklyReportData: function() {
    WeeklyReport.remove({}); // clear old reports

    // generate and add new ones
    const agg = Expenses.aggregate([
      {$match: {
        ownerId: Meteor.userId()
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
        _id: stats._id.year + '-' + stats._id.week
      };
    });
    _(byWeek).forEach((week) => WeeklyReport.upsert(week._id, week));
  },

  deleteExpense: function(id) {
    const expense = Expenses.findOne(id);;
    if (expense.ownerId === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      Expenses.remove(id);
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },

  deleteUser: function(id) {
    const user = Meteor.user.findOne(id);;
    if (user.id === Meteor.userId() || Roles.userIsInRole(Meteor.userId(), ['admin','manager'])) {
      Meteor.user.remove(id);
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },
});

