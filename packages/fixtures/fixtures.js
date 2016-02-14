/** Resets the entire database. Should only be called in velocity mirror. */
function resetDatabase() {
  // safety check
  if (!process.env.IS_MIRROR) {
    throw new Meteor.Error(
      'NOT_ALLOWED',
      'velocityReset is not allowed outside of a mirror. Something has gone wrong.'
    );
  }

  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  var collections = Meteor.wrapAsync(db.collections, db)();
  var appCollections = _.reject(collections, function (col) {
    return col.collectionName.indexOf('velocity') === 0 ||
      col.collectionName === 'system.indexes' ||
      col.collectionName === 'users';
  });

  _.each(appCollections, function (appCollection) {
    console.log('remove ' + appCollection.collectionName);
    Meteor.wrapAsync(appCollection.remove, appCollection)();
  });
};

/**
 * Finds (by username) or creates a user.
 * @param {{username: string}} userData - The data for the user.
 * @param {Array.<string>} roles - The roles to give the user.
 */
function createUser(userData, roles) {
  var user = Meteor.users.findOne({username: userData.username});

  if (!user) {
    var userId = Accounts.createUser(userData);
    user = Meteor.users.findOne(userId);
  }
  if (roles) {
    Roles.addUsersToRoles(user._id, roles);
  }
  console.log('creating user ' + JSON.stringify(user) + ' with roles ' + roles);
  return user;
};

function removeDefaultRateLimit() {
  return Accounts.removeDefaultRateLimit();
}

function createDefaultUsers() {
  var user = createUser({
    username: 'user',
    password: 'user',
  });
  var manager = createUser({
    username: 'manager',
    password: 'manager',
  }, ['manager']);
  var admin = createUser({
    username: 'admin',
    password: 'admin',
  }, ['admin']);
  return [
    user, manager, admin,
  ];
};

/**
 * Creates an expense owned by the iven user.
 * @param {{_id: string}} - The user owning the expense.
 * @param {{timestamp: Date, description: string, amount: number}} - Data for the expense.
 */
function createExpense(user, expenseData) {
  var expenseId = Expenses.insert(_(expenseData).extend({
    ownerId: user._id
  }));
  var expense = Expenses.findOne(expenseId);
  console.log('creating expenses: ' + JSON.stringify(expenseData));
  return expense;
}

/**
 * Creates some expenses for a use.
 * @param {{_id: string}}
 */
function createDefaultExpenses(user) {
  var expenses = [
    {
      "timestamp": "2016-02-10T12:57:32.698Z",
      "description": "This is expense 1",
      "amount": 1.01
    },
    {
      "timestamp": "2016-02-12T11:27:32.698Z",
      "description": "This is expense 2",
      "amount": 2.01,
      "comment": "Comment 2"
    },
    {
      "timestamp": "2016-02-18T10:37:32.698Z",
      "description": "This is expense 3",
      "amount": 31.01,
      "comment": "Comment 3"
    }
  ]
  _(expenses).forEach(function(expense) {
    createExpense(user, expense)
  })
}

Meteor.methods({
  resetDatabase: resetDatabase,
  removeDefaultRateLimit: removeDefaultRateLimit,
  'fixtures/users/create': createUser,
  'fixtures/users/createDefault': createDefaultUsers,
  'fixtures/expenses/create': createExpense,
  'fixtures/expenses/createDefault': createDefaultExpenses,
});
