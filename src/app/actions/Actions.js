import * as ActionTypes from '../constants/ActionTypes';

export function createItem(text, itemType) {
  return {
    type: ActionTypes.CREATE_ITEM,
    itemType: itemType,
    text: text
  };
}

export function deleteItem(id, itemType) {
  return {
    type: ActionTypes.DELETE_ITEM,
    id: id,
    itemType: itemType
  };
}

export function changeItemWeight(id, itemType) {
  return {
    type: ActionTypes.CHANGE_WEIGHT,
    itemType: itemType,
    id: id
  };
}

export function deleteAll(itemType) {
  return {
    type: ActionTypes.DELETE_ALL,
    itemType: itemType
  };
}

export function createNewStore() {
  return {
    type: ActionTypes.CREATE_NEW_STORE
  };
}

export function loadPage(data, ref) {
  return {
    type: ActionTypes.LOAD_PAGE,
    data: data,
    ref: ref
  };
}
