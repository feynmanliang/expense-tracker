describe("Expenses", () => {
  var validExpense;
  beforeAll(() => {
    validExpense = {
      timestamp: new Date(),
      description: "This is an expense",
      amount: 1.01,
      comment: "This is a comment",
      ownerId: Random.id(),
    };
  });

  describe("validation", () => {
    it("validates a correct expense", () => {
      expect(Expenses.schema.newContext().validate(validExpense)).toBeTruthy();
    });

    it("has an optional comment field", () => {
      expect(Expenses.schema.newContext().validate({
        ...validExpense,
        comment: undefined
      })).toBeTruthy();
    });

    describe("has required fields", () => {
      for (let reqField of ['timestamp', 'description', 'amount', 'ownerId']) {
        it("fails when " + reqField + " is missing", () => {
          expect(
            Expenses.schema.newContext().validate(_.omit(validExpense, reqField))
          ).toBeFalsy();
        });
      }

      it("requires a non-negative amount", () => {
        expect(Expenses.schema.newContext().validate({
          ...validExpense,
          amount: -1.01,
        })).toBeFalsy();
      });
    });
  });

  describe("CRUD", () => {
    let validExpense;
    beforeAll(() => {
      validExpense = {
        timestamp: new Date(),
        description: "This is valid",
        amount: 1.01,
      ownerId: Random.id(),
      };
    });
    afterAll(() => {
      validExpense = undefined;
    });

    describe("create", () => {
      it("succeeds with valid expenses", (done) => {
        Expenses.insert(validExpense, (err, res) => {
          expect(res).toBeTruthy();
          done();
        })
      })

      for (let reqField of ['timestamp', 'description', 'amount', 'ownerId']) {
        it("fails when " + reqField + " is missing", (done) => {
          Expenses.insert(_.omit(validExpense, reqField), (err, res) => {
            expect(res).toBeFalsy();
            done();
          });
        });
      }

      it("fails when amount < 0", (done) => {
        Expenses.insert({
          ...validExpense,
          amount: -1.01
        }, (err, res) => {
          expect(res).toBeFalsy();
          done();
        });
      });
    });

    describe("update", () => {
      let expenseId;
      beforeAll(() => {
        expenseId = Expenses.insert(validExpense);
      });
      afterAll(() => Expenses.drop({}));

      it("succeeds on valid updates", (done) => {
        Expenses.update(
          expenseId,
          {
            $set: {
              description: "new description",
              amount: 3.33,
              comment: "",
              timestamp: new Date(),
            }
          },
          (err, res) => {
            expect(res).toBeTruthy();
            done();
          });
      });

      for (let reqField of ['timestamp', 'description', 'amount', 'ownerId']) {
        it("fails when " + reqField + " is unset", (done) => {
          Expenses.update(
            expenseId,
            { $unset: { reqField: "" } },
            (err, res) => {
              expect(res).toBeFalsy();
              done();
            });
        });
      }

      it("fails when amount is set to < 0", (done) => {
        Expenses.update(
          expenseId,
          { $set: { amount: -1.01 } },
          (err, res) => {
            expect(res).toBeFalsy();
            done();
          });
      });
    });
  });
})
