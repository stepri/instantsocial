Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {
  name: 'home',
  template:'postsHome',
  waitOn: function() {
    return [Meteor.subscribe('userFollow')]
  },
  data: function() {

    var following = UserFollowing.find({user1: Meteor.userId()}).fetch();
    followingArray = _.map(following, function(element) {
      return element.user2;
    })
    return { posts:
      Posts.find(
        {$or: [
          { owner: Meteor.userId() },
          { owner: {$in: followingArray}}
        ]},
        {
          sort:{
            createdAt:-1
          }
      })
    };
  }
});

Router.route('/user/:username/post/:_id', {
  name: 'singlePost',
  template:'singlePost',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id, this.params.username);
  },
  data: function() { return Posts.findOne({_id: this.params._id, username: this.params.username}); }
});

Router.route('/user/:username', {
  name: 'userPosts',
  template:'userPosts',
  waitOn: function() {
    return [Meteor.subscribe('userData', this.params.username), Meteor.subscribe('userFollow')]
  },
  data: function() {
    return {user: Meteor.users.findOne({username: this.params.username}), posts: Posts.find({username: this.params.username}, {sort: {createdAt: -1}}) } }
});

Router.route('/user/:username/chats', {
  name: 'userChats',
  template:'userChats',
  waitOn: function() {
    return [Meteor.subscribe('userData', this.params.username), Meteor.subscribe('chats')]
  },
  data: function() {
    var user = Meteor.users.findOne({username: this.params.username});
    if (user) {
      return {user: user, chats: UsersChats.find({$or: [{user1: user._id, user2: Meteor.userId()}, {user2: user._id, user1: Meteor.userId()}]}, {sort: {createdAt: -1}}) } }
    }
});

Router.route('/users', {
  name: 'usersList',
  template:'usersList',
  waitOn: function() {
    return [Meteor.subscribe('users')]
  },
  data: function() {
    return {users: Meteor.users.find({})}
  }
});

Router.route('/settings', {
  name: 'userSettings',
  template:'userSettings',
  waitOn: function() {
    return [Meteor.subscribe('userSettings'),Meteor.subscribe('userData', Meteor.user().username)]
  },
  data: function() {
    return {user: Meteor.users.findOne({username: Meteor.user().username}), settings: UserSettings.find({owner: Meteor.userId()})}
  }
});

Router.onBeforeAction('dataNotFound');
var checkLoggedIn = {
    isLoggedIn: function(pause) {
        if (!(Meteor.loggingIn() || Meteor.user())) {
          this.render('notFound');
          pause();
        } else {
          this.next();
        }
    }
}
Router.before(checkLoggedIn.isLoggedIn, {only: ['userSettings', 'userChats']});
