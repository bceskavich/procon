import ProConApp from './components/ProConApp';
import * as FirebaseUtil from './utils/FirebaseUtil';
import React from 'react';

FirebaseUtil.loadPage();

React.render(
  <ProConApp />,
  document.getElementById('proconapp')
);
