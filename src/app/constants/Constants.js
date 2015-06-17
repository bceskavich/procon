/*
 * Constants for ProCon
 *
 * AUTHOR - Billy Ceskavich
 * DATE - 6/16/15
 */

var  keyMirror = require("keyMirror");

module.exports = {
  ActionTypes: keyMirror({
    CREATE_ITEM: null,
    DELETE_ITEM: null,
    CHANGE_WEIGHT: null,
    DELETE_ALL: null
  })
};
