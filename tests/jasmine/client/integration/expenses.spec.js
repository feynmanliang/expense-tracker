describe ("the expenses page", () => {
  describe("when not logged in", () => {
    it("should redirect to '/'", (done) => {
      Meteor.logout((err) => {
        FlowRouter.go('/expense');
        Meteor.setTimeout(() => {
          // TODO: check redirect
          done();
        }, 400);
      })
    });
  });

  describe("when logged in", () => {
    beforeAll((done) => {
      Package.fixtures.TestUsers.user.login(done);
    });
    afterAll((done) => {
      Package.fixtures.TestUsers.user.logout(done);
    });

    // TODO

    //it("should include navbar links", (done) => {
      //done()
      //Tracker.afterFlush(() => {
        //expect(
          //$('#bs-example-navbar-collapse-1 > ul:nth-child(1)').children().length
        //).toEqual(3);
        //done();
      //})
    //});
  });
});
