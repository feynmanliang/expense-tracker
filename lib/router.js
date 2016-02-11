FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout1', { top: "header", main: "expenseList" });
  }
});

FlowRouter.route('/expense/:expenseId', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout1', { top: "header", main: "updateExpenseForm" });
  }
});

FlowRouter.route('/report', {
  action: function(params, queryParams) {
    Meteor.call("makeWeeklyReportData");
    BlazeLayout.render('layout1', { top: "header", main: "report" });
  }
});


FlowRouter.route('/users', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout1', { top: "header", main: "userList" });
  }
});

FlowRouter.route('/users/:userId', {
  action: function(params, queryParams) {
    BlazeLayout.render('layout1', { top: "header", main: "updateUserForm" });
  }
});
