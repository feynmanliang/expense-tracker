// App component - represents the whole app
App = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      expenses: Expenses.find({}).fetch()
    }
  },

  renderExpenses() {
    return this.data.expenses.map((expense) => {
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
