describe ("the welcome page", () => {
  describe("when not logged in", () => {
    beforeAll((done) => Meteor.logout(done));

    it("should show a login prompt", (done) => {
      FlowRouter.go('/');
      Tracker.afterFlush(() => {
        expect($('.at-btn')[0].value).toEqual("Sign In")
        done()
      });
    });

    it("should not have navbar links", (done) => {
      FlowRouter.go('/');
      Tracker.afterFlush(() => {
        expect($('.navbar .menu .menu').length).toEqual(0);
        done()
      });
    });
  });

  describe("when logged in", () => {
    beforeAll((done) => Package.fixtures.TestUsers.user.login(done));
    afterAll((done) => Package.fixtures.TestUsers.user.logout(done));

    it("should include the user's name on the welcome message", (done) => {
      FlowRouter.go('welcome');
      Tracker.afterFlush(() => {
        expect($('.article h3.ui.header').text()).toContain('user'); // TODO: remove hardcode
        done();
      });
    });

    it("should include navigation links", (done) => {
      Tracker.afterFlush(() => {
        expect($('.navbar .menu .menu').length).toEqual(1);
        done();
      })
    });
  });
});
