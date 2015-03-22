Meteor.publish('posts', function() {
  return Posts.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId },
      { username: this.username }
    ]
  });
});

Meteor.publish('singlePost', function(id, username) {
  return Posts.find({
    $and: [
      {_id: id, username: username},
      { $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ] }
    ]
  });
});

Meteor.publish('userFollow', function() {
  return UserFollowing.find({user1: this.userId});
});

Meteor.publish('userSettings', function() {
  return UserSettings.find({owner: this.userId});
});
Meteor.publish("users", function (username) {
  return Meteor.users.find({}, {fields: {'_id': 1, 'username': 1}});
});
Meteor.publish("userData", function (username) {
  return Meteor.users.find({username: username}, {fields: {'_id': 1, 'username': 1}});
});
Meteor.publish("userDataByID", function (userId) {
  return Meteor.users.find({_id: userId}, {fields: {'_id': 1, 'username': 1}});
});
Meteor.publish('chats', function() {
  return UsersChats.find({$or: [{user1: this.userId}, {user2: this.userId}]});
});
