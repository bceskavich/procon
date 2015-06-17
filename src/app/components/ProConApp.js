var ProConSection = require('./ProConSection');
var React = require('React');

var ProConApp = React.createClass({

  render: function() {
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
      </div>
    );
  }

});

module.exports = ProConApp;
