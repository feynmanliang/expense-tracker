describe ("the expenses page", () => {
  describe("when not logged in", () => {
    it("should redirect to '/'", (done) => {
      Meteor.logout((err) => {
        FlowRouter.go('/expenses');
        Meteor.setTimeout(() => {
          // TODO: check redirect
          done();
        }, 400);
      })
    });
  });

  describe("when logged in", () => {
    beforeAll(() => {
      Package.fixtures.TestUsers.user.login();
    });
    afterAll(() => {
      Package.fixtures.TestUsers.user.logout();
    });

    // TODO

    it("should include navbar links", (done) => {
      Meteor.setTimeout(() => {
        expect(
          $('#bs-example-navbar-collapse-1 > ul:nth-child(1)').children().length
        ).toEqual(3);
        done();
      }, 400);
    });
  });
});
