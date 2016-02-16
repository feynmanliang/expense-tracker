const pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 3,
  },
  pwd
]);

AccountsTemplates.configure({
  onSubmitHook: (error, state) => {
    if (!error) {
      const redirect = Session.get('redirectAfterLogin');
      if (redirect && redirect !== '/') {
        FlowRouter.go(redirect);
      }
    }
  },
});
