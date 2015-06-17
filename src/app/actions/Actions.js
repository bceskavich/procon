var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatcher/AppDispatcher');

var ActionTypes = Constants.ActionTypes;

module.exports = {

  createItem: function(text, itemType) {
    Dispatcher.dispatch({
      type: ActionTypes.CREATE_ITEM,
      itemType: itemType,
      text: text
    });
  },

  deleteItem: function(id, itemType) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_ITEM,
      id: id,
      itemType: itemType
    });
  },

  incrementItem: function(id, itemType) {
    Dispatcher.dispatch({
      type: ActionTypes.INC_ITEM_WEIGHT,
      itemType: itemType,
      id: id
    });
  },

  decrementItem: function(id, itemType) {
    Dispatcher.dispatch({
      type: ActionTypes.DEC_ITEM_WEIGHT,
      itemType: itemType,
      id: id
    });
  },

  deleteAll: function(itemType) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_ALL,
      itemType: itemType
    });
  }
};
