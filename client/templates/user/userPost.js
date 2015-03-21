Template.userPosts.helpers({
  user: function() {
    return Meteor.users.find({username: this.username}).fetch();
  }
});
