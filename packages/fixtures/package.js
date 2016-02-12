Package.describe({
  name: 'fixtures',
  //debugOnly: true // don't bundle with production
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  // all assets will be exported through this global variable
  api.export('Fixtures', 'server');
  api.addAssets('data.json', 'server');
  api.export('TestUsers', 'client');

  api.addFiles([
    'fixtures.js',
    'user-fixtures.js',
  ], 'server');
  api.addFiles([
    'test-user-fixtures.js'
  ], 'client');
});
