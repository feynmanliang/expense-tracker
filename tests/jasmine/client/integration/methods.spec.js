"use strict";

describe("createExpense", () => {
  const validExpense = {
    timestamp: new Date(),
    description: "This is an expense",
    amount: 1.01,
    comment: "This is a comment",
  }

  it("does not insert if user is not logged in", (done) => {
    if (Meteor.user()) Meteor.logout();
    Meteor.call("createExpense", validExpense, (err, res) => {
      expect(res).toBeFalsy();
      done();
    })
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
  const validExpense = {
    timestamp: new Date(),
    description: "This is an expense",
    amount: 1.01,
    comment: "This is a comment"
  }
  const validModifier = {
    description: "New expense description"
  }

  let expenseId;
  it("fails if user is not logged in", (done) => {
    Package.fixtures.TestUsers.user.login();
    expenseId = Meteor.call("createExpense", validExpense);
    Package.fixtures.TestUsers.user.logout();
    Meteor.call("updateExpense", validModifier, (err, res) => {
      expect(err).toBeTruthy();
      expect(res).toBeFalsy();
      done();
    })
    Meteor.call("deleteExpense", expenseId);
  })

  for (let role of ['user', 'manager', 'admin']) {
    describe("as an " + role, () => {
      Package.fixtures.TestUsers[role].login();
      expenseId = Meteor.call("createExpense", validExpense);
      it("updates own expense", (done) => {
        Meteor.call("updateExpense", validModifier, (err, res) => {
          // TODO
          done();
        })
      });

      if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        it("does not update other user's expenses", (done) => {
          // TODO
          done()
        })
      } else {
        it("can edit other user's expenses", () => {
          // TODO
          done()
        })
      }
      Package.fixtures.TestUsers[role].logout();
    })
  }
})
