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

  Template.updateExpenseForm.helpers({
    expenseData: function() {
      return Expenses.findOne({_id: FlowRouter.getParam('expenseId')});
    },
  })

  Template.report.helpers({
    reportData: function() {
      const expenses = Expenses.find({}).fetch();
      const grouped = _(expenses).groupBy(function(exp) {
        return moment(exp.timestamp).year().toString() + " " + moment(exp.timestamp).week().toString();
      })
      const byWeek = _.map(_.pairs(grouped), function(line) {
        return {
          year: line[0].split(" ")[0],
          week: line[0].split(" ")[1],
          expenses: line[1]
        };
      });
      const weeklyStats = _(byWeek).map(function(weekData) {
        const stats = _(weekData.expenses).reduce(function(acc, x) {
          return {
            sum: acc.sum + x.amount,
            count: acc.count + 1
          };
        }, { sum: 0, count: 0 })
        const { year, week } = weekData;
        const { sum, count } = stats;
        return {
          year,
          week,
          total: sum,
          perDayAverage: sum / count
        };
      });
      console.log(weeklyStats)
      return weeklyStats;
    }
  })
}
