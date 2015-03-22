Template.postItem.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  ifUser: function () {
    return Meteor.userId();
  },
  formatText: function(text){
    return text.replace(/\r?\n/g, '<br />');
  }
});

Template.postItem.events({
  "click .deletePost": function (e) {
    e.preventDefault();
    Meteor.call("deletePost",this._id);
    Router.go('/');
    return false;

  },
  "click .togglePrivate": function (e) {

    e.preventDefault();
    Meteor.call("setPrivate",this._id, event.target.checked);

    return false;

  }
});
