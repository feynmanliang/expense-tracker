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
      Expenses.remove(id); // admin can remove any expense
    } else {
      throw new Meteor.Error(403, "Access denied");
    }
  },

  deleteUser: function(id) {
    throw new Meteor.Error(403, "Access denied");
  },

  /**
   * update a user's permissions
   *
   * @param {Object} targetUserId Id of user to update
   * @param {Array} roles User's new permissions
   * @param {String} group Company to update permissions for
   */
  updateRoles: function (targetUserId, roles, group) {
    var loggedInUser = Meteor.user()
    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser,
                            ['admin', 'manager'], group)) {
      throw new Meteor.Error(403, "Access denied")
    }
    Roles.setUserRoles(targetUserId, roles, group)
  }
});

