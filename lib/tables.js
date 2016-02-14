TabularTables = {};

TabularTables.WeeklyReport = new Tabular.Table({
  name: "WeeklyReport",
  collection: WeeklyReport,
  columns: [
    {data: "year", title: "Year"},
    {data: "week", title: "Week"},
    {
      data: "total",
      title: "Weekly Total",
      render: function (val, type, doc) {
        return val.toFixed(2);
      }
    },
    {
      data: "avg",
      title: "Average Per Day",
      render: function (val, type, doc) {
        return val.toFixed(2);
      }
    }
  ],
  changeSelector: function(selector, userId) {
    return {
      ...selector,
      ownerId: userId
    };
  },
  paging: false, // Bug in Tabular: can't limit (used for paging) unordered cursor
});

TabularTables.Expenses = new Tabular.Table({
  name: "Expenses",
  collection: Expenses,
  pub: "tabular_Expenses",
  allow: (userId) => userId ? true : false,
  columns: [
    {data: "ownerName()", title: "Owner"},
    {
      data: "timestamp",
      title: "Date/Time",
      render: function (val, type, doc) {
        return moment(val).toString();
      }
    },
    {data: "description", title: "Description"},
    {
      data: "amount",
      title: "Amount",
      render: function (val, type, doc) {
        return val.toFixed(2);
      }
    },
    {data: "comment", title: "Comment"},
    {
      tmpl: Meteor.isClient && Template.updateExpenseCell
    },
    {
      tmpl: Meteor.isClient && Template.deleteExpenseCell
    }
  ],
  extraFields: ['ownerId'],
  selector: function( userId ) {
    if (Roles.userIsInRole(userId, ['admin'])) {
      return {}; // all expenses if admin
    } else {
      return { ownerId: userId }; // just the expenses for  this user
    }
  }
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
  selector: function( userId ) {
    if (Roles.userIsInRole(userId, ['admin', 'manager'])) {
      return {}; // all users if admin or manager
    } else {
      return { _id: userId }; // just this user
    }
  }
});
