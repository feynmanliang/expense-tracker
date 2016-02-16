exposed = FlowRouter.group({}); // public routes
exposed.route('/', {
  name: 'welcome',
  action: function(params, queryParams) {
    BlazeLayout.render('fullLayout', { main: "welcome" });
  }
});

loggedIn = FlowRouter.group({
  triggersEnter: [
    () => {
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        const route = FlowRouter.current()
        if (!('/' === route.route.name)) {
          Session.set('redirectAfterLogin', route.path);
        }
        FlowRouter.go('welcome');
      }
    }
  ],
});

loggedIn.route('/expense', {
  action: function(params, queryParams) {
    BlazeLayout.render('fullLayout', { main: "expenseTable" });
  }
});

loggedIn.route('/expense/new', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { left: "createExpenseForm", main: "expenseTable" });
  }
});

loggedIn.route('/expense/:expenseId', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { left: "updateExpenseForm", main: "expenseTable" });
  }
});

loggedIn.route('/report', {
  triggersEnter: [
    () => Meteor.call("makeWeeklyReportData", Meteor.userId())
  ],
  action: function(params, queryParams) {
    BlazeLayout.render('fullLayout', { main: "report" });
  }
});

loggedIn.route('/user', {
  action: function(params, queryParams) {
    BlazeLayout.render('fullLayout', { main: "userTable" });
  }
});

loggedIn.route('/user/:userId', {
  action: function(params, queryParams) {
    BlazeLayout.render('mainLayout', { left: "updateUserForm", main: "userTable" });
  }
});

FlowRouter.notFound = {
 action: () => {
   FlowRouter.go('welcome')
 }
}
