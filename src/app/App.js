var ProConApp = require('./components/ProConApp');
var FirebaseUtil = require('./utils/FirebaseUtil');
var React = require('react');

FirebaseUtil.loadPage();

React.render(
  <ProConApp />,
  document.getElementById('proconapp')
);
