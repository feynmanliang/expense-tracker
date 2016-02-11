FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { top: "header", main: "expenseList" });
  }
});

FlowRouter.route('/expense/:expenseId', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { top: "header", main: "updateExpenseForm" });
  }
});

FlowRouter.route('/report', {
  action: function(params, queryParams) {
    Meteor.call("makeWeeklyReportData");
    BlazeLayout.render('mainLayout', { top: "header", main: "report" });
  }
});


FlowRouter.route('/users', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { top: "header", main: "userList" });
  }
});

FlowRouter.route('/users/:userId', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { top: "header", main: "updateUserForm" });
  }
});
