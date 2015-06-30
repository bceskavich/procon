var Firebase = require("firebase");
var PCActions = require("../actions/PCActions");

var basePath = "https://procon.firebaseio.com/";

module.exports = {

  /**
   * Creates a new Firebase store for a user
   * @param {object} data -- The pros / cons to be stored
   * @return {string} id -- The unique ID for the Firebase store
   */
  createNewStore: function(data) {
    // Generate a random alphnumeric ID
    var id = Math.random().toString(36).substr(2,20);
    var firebasePath = basePath + id;
    var ref = new Firebase(firebasePath);
    ref.set(data);

    return id;
  },

  /**
   * Loads previous user data from Firebase
   * @param {string} id -- The users unique id for Firebase
   * @return {object} data -- The saved pros / cons
   */
  loadFromStore: function(id) {
    var firebasePath = basePath + id;
    var ref = new Firebase(firebasePath);

    var data;
    ref.on("value", function(snapshot) {
      data = snapshot.val();
      PCActions.loadPage(data, id);
    }, function(error) {
      // TODO - better error handling here
      console.log("Read failed: " + error.code);
    });

  },

  /**
   * Saves data to an existing Firebase store
   * @param {string} id -- The Firebase store ID
   * @param {object} data -- The data to be set
   */
  saveToStore: function(id, data) {
    var firebasePath = basePath + id;
    var ref = new Firebase(firebasePath);
    ref.set(data);
  },

  /**
   * Loads in data from Firebase, if it exists
   * TODO - There's got to be a better way to do this
   */
  loadPage: function() {
    var path = location.href.split("/");

    if (path[path.length - 1]) {
      var ref = path[path.length - 1];
      this.loadFromStore(ref);
    }
  }

};
