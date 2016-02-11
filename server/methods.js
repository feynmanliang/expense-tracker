Meteor.methods({
  makeWeeklyReportData: function() {
    WeeklyReport.remove({}); // clear old reports

    // generate and add new ones
    const agg = Expenses.aggregate([
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
});

