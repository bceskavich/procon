var Actions = require('../actions/Actions');
var AppStore = require('../stores/AppStore');
var React = require('react');

function getItemFromStore(id, type) {
  return {item: AppStore.getItem(id, type)};
}

var ProConItem = React.createClass({

  getInitialState: function() {
    return getItemFromStore(this.props.id, this.props.type);
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <li
        onClick={this._onClick}
        className={this._getWeightClass()}>
          {this.state.item.text}
      </li>
    );
  },

  // Handles changing the weight of the item
  _onClick: function() {
    Actions.changeItemWeight(this.props.id, this.props.type);
  },

  _onChange: function() {
    this.setState(getItemFromStore(this.props.id, this.props.type));
  },

  _getWeightClass: function() {
    var weight = this.state.item.weight;
    if (weight == 1) {
      return "one";
    } else if (weight == 2) {
      return "two";
    } else if (weight == 3) {
      return "three";
    }
  }

});

module.exports = ProConItem;
