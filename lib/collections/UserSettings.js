UserSettings = new Mongo.Collection('UserSettings');

Meteor.methods({
  getSetting: function (setting, value) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("no-user-found");
    }

    return UserSettings.findOne({owner: Meteor.userId(), setting: setting, value: value});

  },
  updateSetting: function (setting) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("no-user-found");
    }

    var UserSetting = UserSettings.findOne({owner: Meteor.userId(), setting: setting, value: value});

    if (UserSetting){
      throw new Meteor.Error("already-exist");
    } else {
      var UserSettingsId = UserSettings.insert({owner: Meteor.userId(), setting: setting, value: value});
      return UserSettingsId;
    }


  },

});
