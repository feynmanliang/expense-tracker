Template.report.onCreated(function() {
  this.subscribe('WeeklyReport');
});

Template.report.helpers({
  tableSettings: function () {
    return {
      collection: WeeklyReport,
      rowsPerPage: 25,
      showFilter: true,
      enableRegex: true,
      fields: [
        { key: 'year', label: 'Year' },
        { key: 'week', label: 'Week' },
        {
          key: 'total',
          label: 'Total Over Week',
          fn: (value, object, key) => value.toFixed(2),
        },
        {
          key: 'avg',
          label: 'Average Per Day',
          fn: (value, object, key) => value.toFixed(2),
        },
      ],
      class: "ui striped selectable fluid table reactive-table",
    };
  }
});
