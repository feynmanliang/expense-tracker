Expense = React.createClass({
  propTypes: {
    expense: React.PropTypes.object.isRequired
  },
  render() {
    const { timestamp, description, amount, comment } = this.props.expense;
    return (
      <li>
        {timestamp}, {description}, {amount}, {comment}
      </li>
    );
  }
});
