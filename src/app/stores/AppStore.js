import alt from '../alt';
import PCActions from '../actions/PCActions';
import * as FirebaseUtils from '../utils/FirebaseUtil';

class AppStore {

  constructor() {
    this.bindActions(PCActions);

    this.items = {
      pros: {},
      cons: {}
    };
    this.firebaseRef = null;
  }

  // Updates Firebase store if extant
  updateFB() {
    if (this.firebaseRef) {
      FirebaseUtils.saveToStore(this.firebaseRef, this.items);
    }
  }

  onCreateItem(item) {
    const id = Math.random().toString(36).substring(10);
    const timestamp = Date.now();
    var item = {
      id: id,
      date: timestamp,
      text: item.text,
      type: item.type,
      weight: 1
    };

    this.items[item.type][id] = item;
    this.updateFB();
  }

  onDeleteItem(item) {
    delete this.items[item.type][item.id];
    this.updateFB();
  }

  onChangeWeight(item) {
    var myItem = this.items[item.type][item.id];
    if (myItem.weight >= 2) {
      myItem.weight = 1;
    } else {
      myItem.weight += 1;
    }
    this.items[item.type][item.id] = myItem;
  }

  onDeleteAll(type) {
    this.items[type] = {};
  }

  onCreateNewStore() {
    const id = FirebaseUtils.createNewStore(this.items);
    this.firebaseRef = id;
  }

  onLoadPage(payload) {
    this.items = payload.items;
    this.firebaseRef = payload.ref;
  }

  static getItem(id, type) {
    return this.items[type][id];
  }

  static getAllOfType(type) {
    return this.items[type];
  }

  static getAllChrono(type) {
    const { items } = this.getState();
    var itemsArray = [];
    for (var id in items[type]) {
      itemsArray.push(items[type][id]);
    }
    itemsArray.sort((a,b) => {
      return a.date - b.date;
    });
    return itemsArray;
  }

}

export default alt.createStore(AppStore, 'AppStore');
