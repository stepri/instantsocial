Template.postItem.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  ifUser: function () {
    return Meteor.userId();
  }
});

Template.postItem.events({
  "click .deleteNote": function (event, template) {

    Meteor.call("deletePost",this._id);
    Router.go('/');
    return false;

  },
  "click .togglePrivate": function (event, template) {

    Meteor.call("setPrivate",this._id, event.target.checked);

    return false;

  }
});
