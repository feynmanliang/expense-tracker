FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('fullLayout', { main: "welcome" });
  }
});

FlowRouter.route('/expense', {
  action: function(params, queryParams) {
    BlazeLayout.render('fullLayout', { main: "expenseList" });
  }
});

FlowRouter.route('/expense/new', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { left: "createExpenseForm", main: "expenseList" });
  }
});

FlowRouter.route('/expense/:expenseId', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { left: "updateExpenseForm", main: "expenseList" });
  }
});

FlowRouter.route('/report', {
  action: function(params, queryParams) {
    Meteor.call("makeWeeklyReportData");
    BlazeLayout.render('fullLayout', { main: "report" });
  }
});

FlowRouter.route('/user', {
  action: function(params, queryParams) {
    BlazeLayout.render('fullLayout', { main: "userList" });
  }
});

FlowRouter.route('/user/:userId', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { left: "updateUserForm", main: "userList" });
  }
});
