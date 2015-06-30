import PCActions from '../actions/PCActions';
import React, { Component } from 'react';

const ENTER_KEY_CODE = 13;

export default class Composer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {text: ''};
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  render() {
    const placeholder = "Write your " + this.props.type;
    return (
      <input
        className={this.props.type + "-composer"}
        placeholder={placeholder}
        type="text"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown} />
    );
  }

  _onChange(event) {
    this.setState({text: event.target.value});
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        PCActions.createItem({text: text, type: this.props.type});
      }
      this.setState({text: ''});
    }
  }
}
