Template.userSettings.helpers({
  currentUser: function() {
    if (Meteor.userId()) return this.user.username !== Meteor.user().username;
    return false;
  },
  followStatus: function() {
    var currentUserId = this.user._id;

    var following = UserFollowing.findOne({user1: Meteor.userId(), user2: currentUserId});
    if (following) return true;

    return false;
  }
});

Template.userSettings.events({
  "click .followUser": function (event, template) {

    Meteor.call("followUser", this.user._id);

    return false;

  },
  "click .unfollowUser": function (event, template) {

    Meteor.call("unfollowUser", this.user._id);

  }
});
