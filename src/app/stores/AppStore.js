/**
 * AppStore - Handles both pros & cons since they share all qualities
 *
 * AUTHOR - Billy Ceskavich
 * DATE - 6/16/15
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

/**
 * Store object of format:
 * pros: {}, cons: {}
 */
var _items = {
  pros: {},
  cons: {}
};

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
    type: type
  };
  _items[type][id] = item;
}

/**
 * Deletes an item from our store
 * @param {string} id -- The ID for the given item
 * @param {string} type -- The type (pro, con)
 */
function _deleteItem(id, type) {
  delete _items[type][id];
}

/**
 * Deletes all items from our store of given type
 * @param {string} type - The type of the item
 */
function _deleteAllOfType(type) {
  _items[type] = {};
}

/**
 * Increments an items weight
 * @param {string} id -- The ID for the given item
 * @param {string} type -- The type (pro, con)
 */
function _incItemWeight(id, type) {
  _items[type][id].weight += 1;
}

/**
 * Decrements an items weight
 * @param {string} id -- The ID for the given item
 * @param {string} type -- The type (pro, con)
 */
function _decItemWeight(id, type) {
  _items[type][id].weight -= 1;
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
    console.log(items);
    return items;
  }
});

AppStore.dispatchToekn = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CREATE_ITEM:
      _createNewItem(action.text, action.itemType);
      AppStore.emitChange();
      break;

    case ActionTypes.DELETE_ITEM:
      _deleteItem(action.id, action.itemType);
      AppStore.emitChange();
      break;

    case ActionTypes.INC_ITEM_WEIGHT:
      _incItemWeight(action.id, action.itemType);
      AppStore.emitChange();
      break;

    case ActionTypes.DEC_ITEM_WEIGHT:
      _decItemWeight(action.id, action.itemType);
      AppStore.emitChange();
      break;

    case ActionTypes.DELETE_ALL:
      _deleteAllOfType(action.itemType);
      AppStore.emitChange();
      break;

    default:
      // Nothing
  }
});

module.exports = AppStore;
