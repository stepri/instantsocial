Template.userChats.helpers({
  currentUser: function() {
    return this.user._id;
  },
  test: function(){
    console.log(this.chats)
  }
});

Template.userChats.events({
  "submit .userChatsForm": function (e, template) {

    e.preventDefault();

    var ChatText = $(e.target).find('.userChatsText').val();
    var ChatTo = $(e.target).find('.userChatsTo').val();
    console.log(ChatTo)
    $(e.target).find('.userChatsText').val('');

    Meteor.call("UsersChatsNew", ChatTo, ChatText);

    return false;

  }
});
