describe("WeeklyReport", () => {
  it("is isolated across different users", () => {
    const userId = Meteor.users.findOne({username: 'user'})._id;
    Meteor.call("makeWeeklyReportData", userId);
    expect(WeeklyReport.find({ ownerId : userId }).count()).toBeGreaterThan(0);
    const origReport = WeeklyReport.find({ ownerId : userId }).fetch();

    const managerId = Meteor.users.findOne({username: 'manager'})._id;
    Meteor.call("makeWeeklyReportData", managerId);
    expect(WeeklyReport.find({ ownerId : managerId }).count()).toBeGreaterThan(0);

    // Generating manager's report shouldn't have affected user's report
    const report = WeeklyReport.find({ ownerId : userId }).fetch();
    expect(report).toEqual(origReport);
  });
})
