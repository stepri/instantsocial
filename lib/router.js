Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {
  name: 'home',
  template:'postsHome',
  data: function() { return { posts: Posts.find({$or: [{ private: {$ne: true} },{ owner: Meteor.userId() }]}, {sort:{createdAt:-1}}) } }
});

Router.route('/post/:_id', {
  name: 'singlePost',
  template:'singlePost',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/user/:username', {
  name: 'userPosts',
  template:'userPosts',
  data: function() { return {username: this.params.username, posts: Posts.find({username: this.params.username}, {sort: {createdAt: -1}}) } }
});

Router.route('/users', {
  name: 'usersList',
  template:'usersList',
});

Router.onBeforeAction('dataNotFound', {only: 'singlePost'});
