Template.usersList.helpers({
  currentUser: function(username) {
    return Meteor.user().username === username;
  }
});
