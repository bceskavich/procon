var ProConSection = require('./ProConSection');
var AppStore = require('../stores/AppStore');
var Actions = require('../actions/Actions');
import React from 'react';

function getStateFromStore() {
  return {
    ref: AppStore.getFirebaseRef(),
    pros: AppStore.getAllChrono("pros"),
    cons: AppStore.getAllChrono("cons")
  };
}

var ProConApp = React.createClass({

  getInitialState: function() {
    return getStateFromStore();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if (this.state.ref) {
      var linkPath = "http://procon.ceskavich.com/" + this.state.ref;
      buttonOrLink = <a href={linkPath}>{linkPath}</a>;
    } else if (this.state.pros.length > 0 || this.state.cons.length > 0) {
      buttonOrLink = <button className="active" onClick={this._saveSession}>Save Your List</button>;
    } else {
      buttonOrLink = <button disabled onClick={this._saveSession}>Save Your List</button>;
    }

    return (
      <div>
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
        </div>
        <div className="save">
          {buttonOrLink}
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStore());
  },

  _saveSession: function() {
    Actions.createNewStore();
  }

});

module.exports = ProConApp;
