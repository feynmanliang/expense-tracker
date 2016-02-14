describe ("the welcome page", () => {
  it("should have navbar title 'ExpenseTracker'", () => {
    expect($(".navbar-brand").text()).toEqual('ExpenseTracker');
  });

  describe("when not logged in", () => {
    it("should include the text 'Please log in'", (done) => {
      Meteor.logout((err) => {
        FlowRouter.go('/');
        Meteor.setTimeout(() => {
          expect($('.jumbotron p').text()).toContain('Please login');
          done()
        }, 400);
      })
    });

    it("should not have navbar links", (done) => {
      Meteor.logout((err) => {
        FlowRouter.go('/');
        Meteor.setTimeout(() => {
          expect(
            $('#bs-example-navbar-collapse-1 > ul:nth-child(1)').children().length
          ).toEqual(0);
          done()
        }, 400);
      })
    });
  });

  describe("when logged in", () => {
    // TODO: login/out with before/afterAll
    it("should include the user's name on the welcome message", (done) => {
      Package.fixtures.TestUsers.user.login(() => {
        Meteor.setTimeout(() => {
          expect($('.jumbotron h1').text()).toContain(
            Meteor.users.findOne(Meteor.user()).username);
            done();
        }, 400);
      });
      Package.fixtures.TestUsers.user.logout();
    });

    it("should include navbar links", (done) => {
      Package.fixtures.TestUsers.user.login(() => {
        Meteor.setTimeout(() => {
          expect(
            $('#bs-example-navbar-collapse-1 > ul:nth-child(1)').children().length
          ).toEqual(3);
          done();
        }, 400);
      });
      Package.fixtures.TestUsers.user.logout();
    });
  });
});
