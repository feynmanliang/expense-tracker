TabularTables = {};

TabularTables.WeeklyReport = new Tabular.Table({
  name: "WeeklyReport",
  collection: WeeklyReport,
  columns: [
    {data: "year", title: "Year"},
    {data: "week", title: "Week"},
    {data: "total", title: "Weekly Total"},
    {data: "avg", title: "Average Per Day"}
  ],
  paging: false // Bug in Tabular: can't limit (used for paging) unordered cursor
});


TabularTables.Expenses = new Tabular.Table({
  name: "Expenses",
  collection: Expenses,
  columns: [
    {data: "ownerId", title: "Owner"},
    {
      data: "timestamp",
      title: "Date/Time",
      render: function (val, type, doc) {
        return moment(val).toString();
      }
    },
    {data: "description", title: "Description"},
    {data: "amount", title: "Amount"},
    {data: "comment", title: "Comment"},
    {
      tmpl: Meteor.isClient && Template.updateExpenseCell
    },
    {
      tmpl: Meteor.isClient && Template.deleteExpenseCell
    }
  ]
});


TabularTables.Users = new Tabular.Table({
  name: "Users",
  collection: Meteor.users,
  columns: [
    {data: "_id", title: "ID"},
    {data: "username", title: "username"},
    {
      tmpl: Meteor.isClient && Template.updateUserCell
    },
    {
      tmpl: Meteor.isClient && Template.deleteUserCell
    },
  ],
});
