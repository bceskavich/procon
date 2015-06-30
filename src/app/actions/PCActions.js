import alt from '../alt';

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
