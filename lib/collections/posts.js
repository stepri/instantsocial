Posts = new Mongo.Collection('posts');

Meteor.methods({
  deletePost: function (postId) {
    var post = Posts.findOne(postId);


    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Posts.remove(postId);

  },
  createPost: function (text) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("no-user-found");
    }

    var postId = Posts.insert({
			text: text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      createdAt: new Date()
    });

    return postId;

  },
  setPrivate: function (postId, setToPrivate) {
    var post = Posts.findOne(postId);

    if (post.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Posts.update(postId, { $set: { private: setToPrivate } });
  }
});
