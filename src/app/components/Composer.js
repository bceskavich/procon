var Actions = require('../actions/Actions');
var React = require('react');

var ENTER_KEY_CODE = 13;

var Composer = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  render: function() {
    return (
      <div>
        <input
          type="text"
          value={this.state.text}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown} />
      </div>
    );
  },

  _onChange: function(event) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        Actions.createItem(text, this.props.type);
      }
      this.setState({text: ""});
    }
  }

});

module.exports = Composer;
