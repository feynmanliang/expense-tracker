const exposed = FlowRouter.group({}); // public routes
exposed.route('/', {
  name: 'welcome',
  triggersEnter: [
    () => Session.set('navbarSelection', 'welcome'),
  ],
  action: function(params, queryParams) {
    BlazeLayout.render('fullContent', {
      title: "Welcome",
      main: "welcome"
    });
  }
});

const loggedIn = FlowRouter.group({
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

const expenses = loggedIn.group({
  prefix: '/expense',
  triggersEnter: [
    () => Session.set('navbarSelection', 'expense'),
  ]
});

expenses.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('fullContent', {
      title: "Expenses",
      main: "expenseTable"
    });
  }
});

expenses.route('/new', {
  action: function(params, queryParams) {
    BlazeLayout.render('splitContent', {
      title: "Expenses",
      left: "createExpenseForm",
      main: "expenseTable"
    });
  }
});

expenses.route('/:expenseId', {
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
    () => Meteor.call("makeWeeklyReportData", Meteor.userId()),
    () => Session.set('navbarSelection', 'report'),
  ],
  action: function(params, queryParams) {
    BlazeLayout.render('fullContent', {
      title: "Weekly Report",
      main: "report"
    });
  }
});


const users = loggedIn.group({
  prefix: '/user',
  triggersEnter: [
    () => {
      if (!Roles.userIsInRole(Meteor.userId(), ['admin','manager'])) {
        throw new Meteor.Error(403, "Access denied");
      }
    },
    () => Session.set('navbarSelection', 'user'),
  ],
});

users.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render('fullContent', {
      title: "Users",
      main: "userTable"
    });
  }
});

users.route('/:userId', {
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
