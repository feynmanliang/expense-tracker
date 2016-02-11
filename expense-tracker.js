// Populate from fixtures if initially empty
if (Expenses.find({}).count() == 0) {
  _.each(Fixtures.expenses, (expense) => {
    const expenseClean = Expenses.schema.clean(expense)
    Expenses.insert(expenseClean)
  })
}


if (Meteor.isClient) {
  Template.expenseList.helpers({
    expenses: () => Expenses.find({}),
  })

  Template.insertExpenseForm.helpers({
    userId: () => Meteor.userId(),
    expenseData: function() {
      return Expenses.findOne({_id: FlowRouter.getParam('expenseId')});
    },
  })

  Template.updateExpenseForm.helpers({
    userId: () => Meteor.userId(),
    expenseData: function() {
      return Expenses.findOne({_id: FlowRouter.getParam('expenseId')});
    },
  })

  Template.updateExpenseCell.events({
    'click .update': function () {
      FlowRouter.go('/expense/' + this._id);
    }
  });

  Template.deleteExpenseCell.events({
    'click .delete': function () {
      Expenses.remove(this._id);
    }
  });
}

WeeklyReport = new Mongo.Collection('weeklyReport');

if (Meteor.isServer) {
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
}

TabularTables = {};

TabularTables.WeeklyReport = new Tabular.Table({
  name: "WeeklyReport",
  collection: WeeklyReport,
  columns: [
    {data: "year", title: "Year"},
    {data: "week", title: "Week"},
    {data: "total", title: "Weekly Total"},
    {data: "avg", title: "Average Per Day"}
  ],
  paging: false // Bug in Tabular: can't limit (used for paging) unordered cursor
});


TabularTables.Expenses = new Tabular.Table({
  name: "Expenses",
  collection: Expenses,
  columns: [
    {data: "ownerId", title: "Owner"},
    {
      data: "timestamp",
      title: "Date/Time",
      render: function (val, type, doc) {
        return moment(val).toString();
      }
    },
    {data: "description", title: "Description"},
    {data: "amount", title: "Amount"},
    {data: "comment", title: "Comment"},
    {
      tmpl: Meteor.isClient && Template.updateExpenseCell
    },
    {
      tmpl: Meteor.isClient && Template.deleteExpenseCell
    }
  ]
});

