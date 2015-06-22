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

function getItemList(items) {
  if (!items) {
    return '';
  }
  var itemList = items.map(function(item){
    return <ProConItem id={item.id} type={item.type} key={item.id} />;
  });
  return (
    <ul>
      {itemList}
    </ul>
  );
}

function getClearButton(handler) {
  return <a onClick={handler}>Clear All</a>;
}

var ProConSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores(this.props.type);
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var clear;
    if (this.state.items.length > 0) {
      clear = getClearButton(this._clearAll);
    } else {
      clear = '';
    }
    return (
      <div className={this.props.type + "-section"}>
        <Composer type={this.props.type} />
        {getItemList(this.state.items)}
        <div className="clear">
          {clear}
        </div>
      </div>
    );
  },

  // Event handler
  _onChange: function() {
    this.setState(getStateFromStores(this.props.type));
  },

  _clearAll: function() {
    Actions.deleteAll(this.props.type);
  }
});

module.exports = ProConSection;
