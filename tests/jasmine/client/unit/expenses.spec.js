describe("Expenses schema", function() {
  it("validatese correct expenses", function() {
    // Validate an object against the schema
    validExpenses = [
      {
        timestamp: new Date(),
        description: "This is expense 1",
        amount: 1.01
      },
      {
        timestamp: new Date(),
        description: "This is expense 2",
        amount: 2.01,
        comment: "Comment 2"
      }
    ];
    _.forEach(validExpenses, (expense) => {
      expect(Expenses.schema.newContext().validate(expense)).toBeTruthy();
    })
  });

  it("rejects expenses with missing required fields", function() {
    invalidExpenses = [
      {
        description: "This is expense 1",
        amount: 1.01
      },
      {
        timestamp: new Date(),
        description: "This is expense 1",
      },
      {
        timestamp: new Date(),
        amount: 2.01,
        comment: "Comment 2"
      },
      {
        timestamp: new Date(),
        description: "This is expense 1",
        amount: -2.10,
      }
    ];
    _.forEach(invalidExpenses, (expense) => {
      expect(Expenses.schema.newContext().validate(expense)).toBeFalsy();
    })
  });
})
