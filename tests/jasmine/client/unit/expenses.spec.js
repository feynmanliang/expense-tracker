describe ("the expenses page", () => {
  describe("when not logged in", () => {
    beforeAll((done) => Meteor.logout(done));

    it("should redirect to 'welcome'", (done) => {
      FlowRouter.go('/expense');
      Tracker.afterFlush(() => {
        expect(FlowRouter.current().path === FlowRouter.path('welcome')).toEqual(true);
        done();
      });
    });
  });

  describe("when logged in", () => {
    beforeAll((done) => Package.fixtures.TestUsers.user.login(done));
    afterAll((done) => Package.fixtures.TestUsers.user.logout(done));

    it("should include navbar links", (done) => {
      Tracker.afterFlush(() => {
        expect(
          $('#bs-example-navbar-collapse-1 > ul:nth-child(1)').children().length
        ).toEqual(3);
        done();
      })
    });
  });
});
