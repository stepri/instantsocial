UsersChats = new Mongo.Collection('chats');

Meteor.methods({
  UsersChatsNew: function (to, text) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("no-user-found");
    }

    var textId = UsersChats.insert({
			user1: Meteor.userId(),
      user2: to,
      text: text,
      createdAt: new Date()
    });

    return textId;

  },
  deleteChat: function (chatId) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("no-user-found");
    }

    UsersChats.remove({
			user1: Meteor.userId(),
      _id: chatId
    });

    return false;

  }
});
