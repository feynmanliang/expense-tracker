Package.describe({
  name: 'fixtures',
  debugOnly: true // don't bundle with production
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'underscore',
    'mongo'
  ], 'server');
  api.addFiles([
    'fixtures.js'
  ], 'server');
  api.addFiles([
    'test-user-fixtures.js'
  ], 'client');
  api.export('TestUsers', 'client');
});
