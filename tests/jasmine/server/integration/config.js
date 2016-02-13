beforeAll((done) => {
  // Disable login attempt rate limiting for our test users
  Accounts.removeDefaultRateLimit();

  // On server, Fibes will cause each method call to block
  // Need to Promise.all or callbacks on client
  Meteor.call('resetDatabase');
  Meteor.call('fixtures/users/createDefault', (err, users) => {
    _(users).forEach((user) => {
      Meteor.call('fixtures/expenses/createDefault', user);
    });
    done();
  });
});
