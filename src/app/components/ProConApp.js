var ProConSection = require('./ProConSection');
var AppStore = require('../stores/AppStore');
var Actions = require('../actions/Actions');
var React = require('React');

function getFirebaseState() {
  return {
    ref: AppStore.getFirebaseRef()
  };
}

var ProConApp = React.createClass({

  getInitialState: function() {
    return getFirebaseState();
  },

  render: function() {
    var buttonOrLink;
    if (this.state.ref) {
      buttonOrLink = "http://procon.ceskavich.com/" + this.state.ref;
    } else {
      buttonOrLink = <button onClick={this._saveSession}>Save Your List</button>;
    }

    return (
      <div>
        <section className="pros">
          <h1>Pros</h1>
          <ProConSection type="pros" />
        </section>
        <span></span>
        <section className="cons">
          <h1>Cons</h1>
          <ProConSection type="cons" />
        </section>
        {buttonOrLink}
      </div>
    );
  },

  _saveSession: function() {
    console.log("Creating.");
    Actions.createNewStore();
  }

});

module.exports = ProConApp;
