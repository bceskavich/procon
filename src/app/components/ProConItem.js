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
      <li className={this._getWeightClass()}>
        <a onClick={this._delete}><i className="ion-close"></i></a>
        <div onClick={this._changeWeight}>{this.state.item.text}</div>
      </li>
    );
  },

  // Handles changing the weight of the item
  _changeWeight: function() {
    Actions.changeItemWeight(this.props.id, this.props.type);
  },

  // Calls the delete for an item
  _delete: function() {
    Actions.deleteItem(this.props.id, this.props.type);
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
