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
    return <ProConItem item={item} key={item.id} />;
  });
  return (
    <ul>
      {itemList}
    </ul>
  );
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
    return (
      <div className={this.props.type + "-section"}>
        <Composer type={this.props.type} />
        {getItemList(this.state.items)}
      </div>
    );
  },

  // Event handler
  _onChange: function() {
    this.setState(getStateFromStores(this.props.type));
  }
});

module.exports = ProConSection;
