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

  changeItemWeight: function(id, itemType) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_WEIGHT,
      itemType: itemType,
      id: id
    });
  },

  deleteAll: function(itemType) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_ALL,
      itemType: itemType
    });
  },

  createNewStore: function() {
    Dispatcher.dispatch({
      type: ActionTypes.CREATE_NEW_STORE
    });
  },

  loadPage: function(data, ref) {
    Dispatcher.dispatch({
      type: ActionTypes.LOAD_PAGE,
      data: data,
      ref: ref
    });
  }
};
