Template.postsHome.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  },
  ifUser: function () {
    return Meteor.userId();
  },
  postDate: function () {
    return moment(createdAt).format('LLL');
  }
});

Template.postsHome.events({
  "submit .addPostForm": function (e) {
    e.preventDefault();

    var PostText = $(e.target).find('.addPostText').val();

    $(e.target).find('.addPostText').val('');

    Meteor.call("createPost", PostText);

    return false;


  },
  "click .deletePost": function (event, template) {

    Meteor.call("deletePost",this._id);

    return false;

  },
  "click .togglePrivate": function (event, template) {

    Meteor.call("setPrivate",this._id, event.target.checked);

    return false;

  }
});
