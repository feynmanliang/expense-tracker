Template.navbar.events({
  'click .logout': (event) => {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('/');
  }
});

Template.navbar.helpers({
  isActive: (selection) => selection === Session.get('navbarSelection') ? 'active' : '',
  isManagerOrAdmin: () => Roles.userIsInRole(Meteor.userId(), ['admin','manager']),
})
