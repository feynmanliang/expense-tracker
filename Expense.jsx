Expense = React.createClass({
  propTypes: {
    expense: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.expense.text}</li>
    );
  }
});
