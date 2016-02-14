"use strict";

describe("createExpense", () => {
  const validExpense = {
    timestamp: new Date(),
    description: "This is an expense",
    amount: 1.01,
    comment: "This is a comment",
  }

  it("does not insert if user is not logged in", (done) => {
    Meteor.wrapPromise(Meteor.logout)()
      .then(() => Meteor.promise("createExpense", validExpense))
      .then((res) => {
        expect(res).toBeFalsy();
        done();
      })
      .catch((err) => {
        expect(err).toBeTruthy();
        done();
      });
  });

  it("inserts when a user is logged in", (done) => {
    Meteor.wrapPromise(Package.fixtures.TestUsers.user.login)()
      .then(() => Meteor.promise("createExpense", validExpense))
      .then((res) => expect(res).toBeTruthy())
      .then(() => Meteor.wrapPromise(Package.fixtures.TestUsers.user.logout))
      .then(done)
      .catch((err) => {
        expect(err).toBeFalsy();
        done();
      });
  });
})

describe("updateExpense", () => {
  const validModifier = {
    $set: { description: "New expense description" }
  }
  const expenseData =  {
    timestamp: new Date(),
    description: "Another user's expense",
    amount: 42.42
  }
  var otherExpense;
  beforeAll((done) => {
    Meteor.promise('fixtures/expenses/create', { _id: Random.id() }, expenseData)
      .then((expense) => otherExpense = expense)
      .then(done)
  });

  it("fails if user is not logged in", (done) => {
    Meteor.wrapPromise(Meteor.logout)()
      .then(() => Meteor.promise("updateExpense", validModifier, otherExpense._id))
      .then((res) => {
        expect(res).toBeFalsy();
        done();
      })
      .catch((err) => {
        expect(err).toBeTruthy();
        done();
      });
  });

  for (let role of ['user', 'manager', 'admin']) {
    describe("as an " + role, () => {
      const validExpense = {
        timestamp: new Date(),
        description: "This is an expense",
        amount: 1.01,
        comment: "This is a comment"
      }
      beforeAll((done) => Package.fixtures.TestUsers[role].login(done));
      afterAll((done) => Package.fixtures.TestUsers[role].logout(done));

      it("updates own expense", (done) => {
        Meteor.promise('fixtures/expenses/create', Meteor.user(), validExpense)
          .then((ownExpense) => Meteor.promise("updateExpense", validModifier, ownExpense._id))
          .then((res) => {
            expect(res).toBeTruthy();
            done();
          })
          .catch((err) => {
            expect(err).toBeFalsy();
            done();
          });
      });

      it("only updates other expenses if user is admin", (done) => {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          Meteor.call("updateExpense", validModifier, otherExpense._id, (err, res) => {
            expect(res).toBeFalsy();
            expect(err).toBeTruthy();
            done();
          });
        } else {
          Meteor.call("updateExpense", validModifier, otherExpense._id, (err, res) => {
            expect(res).toBeTruthy();
            expect(err).toBeFalsy();
            done();
          })
        }
      })
    })
  }
})
