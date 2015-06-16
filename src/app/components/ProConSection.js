var ProConItem = require('./ProConItem');
var Composer = require('./Composer');
var AppStore = require('../stores/AppStore');
var Actions = require('../actions/Actions');
var React = require('react');

function getStateFromStores(type) {
  return {
    items: AppStore.getAllChrono(type)
  };
}

function getProConItem(item) {
  return (
    <ProConItem item={item} />
  );
}

var ProConSection = React.createClass({

  getInitialState: function() {
    getStateFromStores(this.props.type);
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var items = this.state.items.map(getProConItem);
    return (
      <div className={this.props.type + "-section"}>
        <Composer type={this.props.type} />
        <ul className={this.props.type + "-list">
          {items}
        </ul>
      </div>
    );
  }

  // Event handler
  _onChange: function() {
    this.setState(getStateFromStores(this.props.type));
  }
});

module.exports = ProConSection;
