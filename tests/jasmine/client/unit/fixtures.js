beforeAll((done) => {
  Meteor.promise('removeDefaultRateLimit') // Disable login attempt rate limiting for testing
    .then(() => Meteor.promise('resetDatabase'))
    .then(() => Meteor.promise('fixtures/users/createDefault'))
    .then((users) => {
      Promise.all(users.map((user) => Meteor.promise('fixtures/expenses/createDefault', user)))
    })
    .then(done)
    .catch((err) => console.log(err))
});
