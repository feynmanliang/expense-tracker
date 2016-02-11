describe("Expenses", function() {
  describe("validation", function() {
    var validExpenses;
    var invalidExpenses;
    beforeAll(function() {
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
    });
    it("validatese correct expenses", function() {
      _.forEach(validExpenses, (expense) => {
        expect(Expenses.schema.newContext().validate(expense)).toBeTruthy();
      })
    });

    it("rejects expenses with missing required fields", function() {
      _.forEach(invalidExpenses, (expense) => {
        expect(Expenses.schema.newContext().validate(expense)).toBeFalsy();
      })
    });
  });

  describe("CRUD", function() {
    var validExpense;
    var invalidExpense;
    beforeAll(function() {
      validExpense = {
        timestamp: new Date(),
        description: "This is valid",
        amount: 1.01
      };
      invalidExpense = {
        timestamp: new Date(),
        description: "This is invalid",
        amount: -1.01
      };
    });

    var insertedId;
    beforeEach(function() {
      insertedId = Expenses.insert(validExpense, function(err, res) {
        expect(res).toBeTruthy();
      });
    });
    afterEach(function() {
      Expenses.remove(insertedId);
    });

    it("validates data being inserted", function() {
      Expenses.insert(invalidExpense, function(err, res) {
        expect(err).toBeTruthy();
      });
    });

    it("validates updates", function() {
      Expenses.update(insertedId, { $unset: { description: "" } }, function(err, res) {
        expect(err).toBeTruthy();
      })
      Expenses.update(insertedId, { $unset: { timestamp: "" } }, function(err, res) {
        expect(err).toBeTruthy();
      })
      Expenses.update(insertedId, { $set: { amount: -2.05 } }, function(err, res) {
        expect(err).toBeTruthy();
      })
      Expenses.update(insertedId, { $set: { description: "new descrip" } }, function(err, res) {
        expect(res).toBeTruthy();
      })
      Expenses.update(insertedId, { $set: { amount: 3.33 } }, function(err, res) {
        expect(res).toBeTruthy();
      })
      Expenses.update(insertedId, { $unset: { comment: "" } }, function(err, res) {
        expect(res).toBeTruthy();
      })
    });
  });
})
