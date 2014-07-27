Upvotemaps = new Meteor.Collection('upvotemap');
/* stores user and postId */
Meteor.methods({
  update: function(postId) {
    var user = Meteor.user();
    var post = postId;
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You don't have permissions to do this.");
    //assuming you can't spoof own user id for update
    console.log("test");
    // search upvoteMaps to check existing user mapping to postId. 
    if (Upvotemaps.findOne(userId = user._id)){
      console.log('first');
      //update mapping
    } else {
      console.log('second');
      //add mapping
      // pick out the whitelisted keys
      var upvotemap = _.extend(_.pick(upvotemapAttributes), {
        userId: user._id, 
        postId: post._id
      });
      
      var upvoteId = Upvotemaps.insert(upvotemap);
      
    }
    // if postId != postId, then do a fix of upvote/downvote. 
    // update post with the number of upvotes
    //Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    
    return true;
  }
});