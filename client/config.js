AccountsTemplates.addField({
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 3,
    errStr: 'error.minChar'
});

AccountsTemplates.removeField('email');

Accounts.onLogin(() => {
  const redirect = Session.get('redirectAfterLogin');
  if (redirect && redirect !== '/') {
    FlowRouter.go(redirect);
  }
});
