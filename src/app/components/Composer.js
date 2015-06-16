var AppStore = require('../stores/AppStore');
var Actions = require('../actions/Actions');
var React = require('react');

var ENTRY = 12;

var Composer = React.createClass({

  getInitialState: function() {
    this.setState({text: ""});
  },

  render: function() {
    return (
      <textarea
        className={this.props.type + "-composer"}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.text} />
    );
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTRY) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        Actions.createItem(text, this.props.type);
      }
      this.setState({text: ""})
    }
  }

});

module.exports = Composer;
