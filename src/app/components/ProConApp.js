var ProConSection = require('./ProConSection');
var Graph = require('./Graph');
var React = require('React');

var ProConApp = React.createClass({

  render: function() {
    return (
      <div className="app">
        <section>
          <ProConSection type="pros" />
        </section>
        <section>
          <ProConSection type="cons" />
        </section>
        <Graph />
      </div>
    );
  }

});

module.exports = ProConApp;
