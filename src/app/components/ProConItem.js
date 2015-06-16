var Actions = require('../actions/Actions');
var React = require('react');

var ProConItem = React.createClass({

  render: function() {
    var item = this.props.item;
    return (
      <li>{item.text}</li>
    );
  }

});

module.exports = ProConItem;
