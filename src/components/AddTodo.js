import React from "react";
import { connect } from "react-redux";
import { addTodo, addRandomTodo } from "../redux/actions";
import cx from "classnames";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }
  updateInput = input => {
    this.setState({ input });
  };
  handleAddThisTodo = () => {
    this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  };
  handleAddRandomTodo = () => {
    this.props.addRandomTodo(this.state.input);
  };
  render() {
    const { fetching } = this.props;
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo__btn" onClick={this.handleAddThisTodo}>
          Add This Todo
        </button>
        <button
          className={cx("add-todo__btn", fetching && "add-todo__btn--fetching")}
          onClick={this.handleAddRandomTodo}
        >
          Add Random Todo
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { fetching: state.todos.fetching };
};

export default connect(
  mapStateToProps,
  { addTodo, addRandomTodo }
)(AddTodo);
