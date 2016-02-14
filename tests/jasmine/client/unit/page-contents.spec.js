describe ("the welcome page", () => {
  it("should have navbar title 'ExpenseTracker'", () => {
    expect($(".navbar-brand").text()).toEqual('ExpenseTracker');
  });

  describe("when not logged in", () => {
    beforeAll((done) => Meteor.logout(done));

    it("should include the text 'Please log in'", (done) => {
      FlowRouter.go('/');
      Tracker.afterFlush(() => {
        expect($('.jumbotron p').text()).toContain('Please login');
        done()
      });
    });

    it("should not have navbar links", (done) => {
      FlowRouter.go('/');
      Tracker.afterFlush(() => {
        expect(
          $('#bs-example-navbar-collapse-1 > ul:nth-child(1)').children().length
        ).toEqual(0);
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
        expect($('.jumbotron h1').text()).toContain('user'); // TODO: remove hardcode
        done();
      });
    });

    it("should include navbar links", () => {
      expect(
        $('#bs-example-navbar-collapse-1 > ul:nth-child(1)').children().length
      ).toEqual(3);
    });
  });
});
