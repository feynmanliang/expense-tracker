exposed = FlowRouter.group({}); // public routes
exposed.route('/', {
  name: 'welcome',
  action: function(params, queryParams) {
    BlazeLayout.render('fullContent', {
      title: "Welcome",
      main: "welcome"
    });
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
    BlazeLayout.render('fullContent', {
      title: "Expenses",
      main: "expenseTable"
    });
  }
});

loggedIn.route('/expense/new', {
  action: function(params, queryParams) {
    BlazeLayout.render('splitContent', {
      title: "Expenses",
      left: "createExpenseForm",
      main: "expenseTable"
    });
  }
});

loggedIn.route('/expense/:expenseId', {
  action: function(params, queryParams) {
    BlazeLayout.render('splitContent', {
      title: 'Expenses',
      left: "updateExpenseForm",
      main: "expenseTable"
    });
  }
});

loggedIn.route('/report', {
  triggersEnter: [
    () => Meteor.call("makeWeeklyReportData", Meteor.userId())
  ],
  action: function(params, queryParams) {
    BlazeLayout.render('fullContent', {
      title: "Weekly Report",
      main: "report"
    });
  }
});

loggedIn.route('/user', {
  action: function(params, queryParams) {
    BlazeLayout.render('fullContent', {
      title: "Users",
      main: "userTable"
    });
  }
});

loggedIn.route('/user/:userId', {
  action: function(params, queryParams) {
    BlazeLayout.render('splitContent', {
      title: 'Users',
      left: "updateUserForm",
      main: "userTable"
    });
  }
});

FlowRouter.notFound = {
 action: () => {
   FlowRouter.go('welcome')
 }
}
