Meteor.publish('posts', function() {
  return Posts.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId },
      { username: this.username }
    ]
  });
});

Meteor.publish('singlePost', function(id) {
  return Posts.find({
    $and: [
      {_id: id},
      { $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ] }
    ]
  });
});

Meteor.publish('users', function(id) {
  return Users.find({}, 'username');
});
