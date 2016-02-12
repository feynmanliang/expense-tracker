Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

Accounts.onLogin(() => {
  const redirect = Session.get('redirectAfterLogin');
  if (redirect && redirect !== '/') {
    FlowRouter.go(redirect);
  }
});
