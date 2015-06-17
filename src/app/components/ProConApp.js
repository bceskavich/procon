var ProConSection = require('./ProConSection');
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
      </div>
    );
  }

});

module.exports = ProConApp;
