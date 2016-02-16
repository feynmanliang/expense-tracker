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
});
