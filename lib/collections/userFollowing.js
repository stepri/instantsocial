UserFollowing = new Mongo.Collection('UserFollowing');

Meteor.methods({
  findFollow: function (userId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("no-user-found");
    } else if (Meteor.userId() == userId) {
      throw new Meteor.Error("user-same");
    }

    var follow = UserFollowing.findOne({
			user1: Meteor.userId(),
      user2: userId
    });

  },
  followUser: function (userId) {
		if (!Meteor.userId()) {
      throw new Meteor.Error("no-user-found");
    } else if (Meteor.userId() == userId) {
      throw new Meteor.Error("user-same");
    }

		var follow = UserFollowing.findOne({
			user1: userId,
      user2: Meteor.userId()
    });

		if (!follow){
			var followId = UserFollowing.insert({
				user1: Meteor.userId(),
	      user2: userId,
	      followedAt: new Date()
	    });
	    return followId;
		} else {
			return false;
		}

  },
  unfollowUser: function (userId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("no-user-found");
    } else if (Meteor.userId() == userId) {
      throw new Meteor.Error("user-same");
    }

    return UserFollowing.remove({
			user1: Meteor.userId(),
      user2: userId
    });

  }
});
