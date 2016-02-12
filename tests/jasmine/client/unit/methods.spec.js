describe("createExpense", () => {
  const validExpense = {
    timestamp: new Date(),
    description: "This is an expense",
    amount: 1.01,
    comment: "This is a comment",
  }

  it("does not insert if user is not logged in", () => {
    if (Meteor.user()) Meteor.logout();
    Meteor.call("createExpense", validExpense, (err, res) => {
      expect(res).toBeFalsy();
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
    comment: "This is a comment",
    ownerId: Random.id(),
  }
})
