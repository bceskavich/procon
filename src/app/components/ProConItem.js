import PCActions from '../actions/PCActions';
import React, { Component } from 'react';

export default class ProConItem extends Component {

  constructor(props, context) {
    super(props, context);
    this._changeWeight = this._changeWeight.bind(this);
    this._delete = this._delete.bind(this);
    this._getWeightClass = this._getWeightClass.bind(this);
  }

  render() {
    return (
      <li className={this._getWeightClass()}>
        <a onClick={this._delete}><i className="ion-close"></i></a>
        <div onClick={this._changeWeight}>{this.props.item.text}</div>
      </li>
    );
  }

  // Handles changing the weight of the item
  _changeWeight() {
    PCActions.changeItemWeight(this.props.item.id, this.props.item.type);
  }

  // Calls the delete for an item
  _delete() {
    PCActions.deleteItem(this.props.item.id, this.props.item.type);
  }

  _getWeightClass() {
    const weight = this.props.item.weight;
    if (weight == 1) {
      return "one";
    } else if (weight == 2) {
      return "two";
    } else if (weight == 3) {
      return "three";
    }
  }
}

