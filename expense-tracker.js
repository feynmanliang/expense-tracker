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
      if (Reports.find().count() == 0) {
        Meteor.call('makeReportData', function(err,res) {
          Reports.insert(res);
        });
      }
      return Reports.findOne();
    },
  })
}

Reports = new Mongo.Collection(null);

if(Meteor.isServer) {
   Meteor.methods({
     makeReportData: function() {
       const reportData = Expenses.aggregate([
         {$group: {
           _id: {
             week: { $week: "$timestamp" }
           },
           total: { $sum: "$amount" },
           perDayAverage: { $avg: "$amount" }
         }}
       ]);
       return reportData;
     }
   });
}

