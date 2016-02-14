beforeAll((done) => {
  // Disable login attempt rate limiting for our test users
  Accounts.removeDefaultRateLimit();

  // On server, Fibes will cause each method call to block
  // Need to Promise.all or callbacks on client
  Meteor.call('resetDatabase', () => {
    Meteor.call('fixtures/users/createDefault', (err, users) => {
      // TOOD: use promises to make better
      Meteor.call('fixtures/expenses/createDefault', users[0], () => {
        Meteor.call('fixtures/expenses/createDefault', users[1], () => {
          Meteor.call('fixtures/expenses/createDefault', users[2], () => {
            done();
          });
        });
      });
    });
  });
});
