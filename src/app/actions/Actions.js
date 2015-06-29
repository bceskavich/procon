import alt from '../alt';
import AppStore from '../stores/AppStore';

class PCActions {

  constructor() {
    this.generateActions(
      'createItem',
      'deleteItem',
      'changeItemWeight',
      'deleteAll',
      'createNewStore',
      'loadPage'
    );
  }
}

export default alt.createActions(PCActions);
