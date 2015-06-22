/**
 * AppStore - Handles both pros & cons since they share all qualities
 *
 * AUTHOR - Billy Ceskavich
 * DATE - 6/16/15
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants.js');
var FirebaseUtils = require('../utils/FirebaseUtil');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

// Stores
var _items = {
  pros: {},
  cons: {}
};
var _firebaseRef;

/**
 * Adds a new item to the private store
 */
function _createNewItem(text, type) {
  var id = Math.random().toString(36).substring(10);
  var timestamp = Date.now();
  var item = {
    id: id,
    date: timestamp,
    text: text,
    type: type,
    weight: 1
  };

  _items[type][id] = item;

  // If saved to Firebase, add new data to it
  if (_firebaseRef) {
    FirebaseUtils.saveToStore(_firebaseRef, _items);
  }
}

/**
 * Deletes an item from our store
 */
function _deleteItem(id, type) {
  delete _items[type][id];
}

/**
 * Deletes all items from our store of given type
 */
function _deleteAllOfType(type) {
  _items[type] = {};
}

/**
 * Increments (or resets) the weight of an item
 */
function _changeWeight(id, type) {
  var item = _items[type][id];
  if (item.weight >= 2) {
    item.weight = 1;
  } else {
    item.weight += 1;
  }
  _items[type][id] = item;
}

// Updates Firebase store if extant
function _updateFB() {
  if (_firebaseRef) {
    FirebaseUtils.saveToStore(_firebaseRef, _items);
  }
}

var AppStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Gets and returns item of ID & type
   */
  getItem: function(id, type) {
    return _items[type][id];
  },

  // Gets and returns the firebase reference ID, if it exists
  getFirebaseRef: function() {
    if (_firebaseRef) {
      return _firebaseRef;
    } else {
      return null;
    }
  },

  /**
   * Gets and returns items of provided type
   */
  getAllOfType: function(type) {
    return _items[type];
  },

  /**
   * Gets all of given type, ordered by creation
   */
  getAllChrono: function(type) {
    var items = [];
    for (var id in _items[type]) {
      items.push(_items[type][id]);
    }
    items.sort(function(a,b) {
      return a.date - b.date;
    });
    return items;
  }
});

AppStore.dispatchToekn = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.LOAD_PAGE:
      _items = action.data;
      _firebaseRef = action.ref;
      AppStore.emitChange();
      break;

    case ActionTypes.CREATE_ITEM:
      _createNewItem(action.text, action.itemType);
      _updateFB();
      AppStore.emitChange();
      break;

    case ActionTypes.DELETE_ITEM:
      _deleteItem(action.id, action.itemType);
      _updateFB();
      AppStore.emitChange();
      break;

    case ActionTypes.CHANGE_WEIGHT:
      _changeWeight(action.id, action.itemType);
      _updateFB();
      AppStore.emitChange();
      break;

    case ActionTypes.DELETE_ALL:
      _deleteAllOfType(action.itemType);
      _updateFB();
      AppStore.emitChange();
      break;

    case ActionTypes.CREATE_NEW_STORE:
      var id = FirebaseUtils.createNewStore(_items);
      _firebaseRef = id;
      AppStore.emitChange();

    default:
      // Nothing
  }
});

module.exports = AppStore;
