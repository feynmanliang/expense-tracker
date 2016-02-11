Expense = React.createClass({
  propTypes: {
    expense: React.PropTypes.object.isRequired
  },
  render() {
    const { timestamp, description, amount, comment } = this.props.expense;
    return (
      <li>
        {timestamp.toString()}, {description}, {amount}, {comment}
      </li>
    );
  }
});
