import Firebase from 'firebase';
import PCActions from '../actions/PCActions';

const basePath = "https://procon.firebaseio.com/";

/**
 * Creates a new Firebase store for a user
 * @param {object} data -- The pros / cons to be stored
 * @return {string} id -- The unique ID for the Firebase store
 */
export function createNewStore(data) {
  // Generate a random alphnumeric ID
  const id = Math.random().toString(36).substr(2,20);
  const firebasePath = basePath + id;
  let ref = new Firebase(firebasePath);
  ref.set(data);

  return id;
}

/**
 * Loads previous user data from Firebase
 * @param {string} id -- The users unique id for Firebase
 * @return {object} data -- The saved pros / cons
 */
export function loadFromStore(id) {
  const firebasePath = basePath + id;
  let ref = new Firebase(firebasePath);

  var data;
  ref.on("value", function(snapshot) {
    data = snapshot.val();
    PCActions.loadPage({items: data, ref: id});
  }, function(error) {
    // TODO - better error handling here
    console.log("Read failed: " + error.code);
  });
}

/**
 * Saves data to an existing Firebase store
 * @param {string} id -- The Firebase store ID
 * @param {object} data -- The data to be set
 */
export function saveToStore(id, data) {
  const firebasePath = basePath + id;
  let ref = new Firebase(firebasePath);
  ref.set(data);
}

/**
 * Loads in data from Firebase, if it exists
 * TODO - There's got to be a better way to do this
 */
export function loadPage() {
  const path = location.href.split("/");

  if (path[path.length - 1]) {
    const ref = path[path.length - 1];
    loadFromStore(ref);
  }
}
