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
        { key: 'total', label: 'Total Over Week' },
        { key: 'avg', label: 'Average Per Day' },
      ],
      class: "ui celled table",
    };
  }
});
