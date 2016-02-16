WeeklyReport = new Mongo.Collection('weeklyReport');
WeeklyReport.schema = new SimpleSchema({
  year: {
    type: Number,
    label: "Year",
  },
  week: {
    type: Number,
    label: "Week",
  },
  total: {
    type: Number,
    label: "Total Over Week",
    decimal: true,
    min: 0
  },
  avg: {
    type: Number,
    label: "Average Per Day",
    decimal: true,
    min: 0
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
});
WeeklyReport.attachSchema(WeeklyReport.schema);
