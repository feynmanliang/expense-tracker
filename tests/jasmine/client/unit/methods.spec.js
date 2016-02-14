"use strict";

describe("createExpense", () => {
  const validExpense = {
    timestamp: new Date(),
    description: "This is an expense",
    amount: 1.01,
    comment: "This is a comment",
  }

  it("does not insert if user is not logged in", (done) => {
    Meteor.logout(() => {
      Meteor.call("createExpense", validExpense, (err, res) => {
        expect(res).toBeFalsy();
        done();
      })
    });
  })

  it("inserts when a user is logged in", (done) => {
    Package.fixtures.TestUsers.user.login(() => {
      Meteor.call("createExpense", validExpense, (err, res) => {
        expect(res).toBeTruthy();
        done();
      })
    });
    Package.fixtures.TestUsers.user.logout();
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
    Meteor.call(
      'fixtures/expenses/create', { _id: Random.id() }, expenseData, (err, expense) => {
        otherExpense = expense;
        done();
      }
    )
  });

  it("fails if user is not logged in", (done) => {
    Meteor.logout(() => {
      Meteor.call("updateExpense", validModifier, otherExpense._id, (err, res) => {
        expect(err).toBeTruthy();
        expect(res).toBeFalsy();
        done();
      });
    });
  })

  for (let role of ['user', 'manager', 'admin']) {
    describe("as an " + role, () => {
      const validExpense = {
        timestamp: new Date(),
        description: "This is an expense",
        amount: 1.01,
        comment: "This is a comment"
      }
      beforeAll((done) => Package.fixtures.TestUsers[role].login(() => {
        done()
      });
      afterAll((done) => Package.fixtures.TestUsers[role].logout(done));
      it("updates own expense", (done) => {
        Meteor.call('fixtures/expenses/create', Meteor.user(), validExpense, (err, ownExpense) => {
          Meteor.call("updateExpense", validModifier, ownExpense._id, (err, res) => {
            expect(res).toBeTruthy();
            expect(err).toBeFalsy();
            done();
          });
        });
      });

      if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        it("does not update other user's expenses", (done) => {
          Meteor.call("updateExpense", validModifier, otherExpense._id, (err, res) => {
            expect(res).toBeFalsy();
            expect(err).toBeTruthy();
            done();
          });
        });
      } else {
        it("can edit other user's expenses", (done) => {
          Meteor.call("updateExpense", validModifier, otherExpense._id, (err, res) => {
            expect(res).toBeTruthy();
            expect(err).toBeFalsy();
            done();
          })
        });
      }
    })
  }
})
