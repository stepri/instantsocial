Template.chatItem.helpers({
  currentUser: function () {
    return Meteor.user().username;
  },
  isOwner: function () {
    return this.user1 === Meteor.userId();
  },
  ifUser: function () {
    return Meteor.userId();
  },
  formatText: function(text){
    return text.replace(/\r?\n/g, '<br />');
  }
});

Template.chatItem.events({
  "click .deleteChat": function (e) {
    e.preventDefault();

    Meteor.call("deleteChat",this._id);
    return false;

  }
});
