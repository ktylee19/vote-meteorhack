Meteor.publish('newPosts', function(limit) {
  return Posts.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('bestPosts', function(limit) {
  return Posts.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});


Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('upvotemaps', function() {
  return Upvotemaps.find();
});


/*
Upvotemaps.allows ({
  insert: isAdmin,
  update: isAdmin,
  remove: isAdmin
})*/

Accounts.onCreateUser(function(options, user) {
        if (user.services) {
            var service = _.keys(user.services)[0];
            var email = user.services[service].email;
 
            if (service == 'github') {
                if (!user.profile)
                    user.profile = {};
                if (!user.username)
                    user.username = user.services[service].username;
            }
 
            if (!email)
                return user;
 
            // see if any existing user has this email address, otherwise create new
            var existingUser = Meteor.users.findOne({'emails.address': email});
            if (!existingUser)
                return user;
 
            // copy accross new service info
            existingUser.services[service] = user.services[service];
            existingUser.services.resume.loginTokens.push(
                user.services.resume.loginTokens[0]
            );
 
            // even worse hackery
            Meteor.users.remove({_id: existingUser._id}); // remove existing record
            return existingUser;                          // record is re-inserted
        }
    });