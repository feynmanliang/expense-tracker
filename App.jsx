// App component - represents the whole app
App = React.createClass({
  getExpenses() {
    return [
      { _id: 1, text: "This is expense 1" },
      { _id: 2, text: "This is expense 2" },
      { _id: 3, text: "This is expense 3" }
    ];
  },

  renderExpenses() {
    return this.getExpenses().map((expense) => {
      return <Expense key={expense._id} expense={expense} />;
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Expenses List</h1>
        </header>

        <ul>
          {this.renderExpenses()}
        </ul>
      </div>
    );
  }
});
