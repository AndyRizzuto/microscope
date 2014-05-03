Errors = {
  // Local (client-only) collection
  collection: new Meteor.Collection(null),

  throw: function(message) {
    Errors.collection.insert({message: message, seen: false})
  },
  clearSeen: function() {
    Errors.collection.remove({seen: true})
  }
};
// Write messages to local miniMongo using this syntax in any .js
// throwError = function(message) {
//  Errors.insert({message: message, seen: false})
// }
//

