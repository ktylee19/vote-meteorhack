Upvotemaps = new Meteor.Collection('upvotemap');
/* stores user and postId */
Meteor.methods({
  updateUpvotemap: function(postId) {
    var user = Meteor.user();
    console.log(user);
    console.log(user._id);
    console.log(postId);
    var post = postId;
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You don't have permissions to do this.");
    //assuming you can't spoof own user id for update
    console.log("test");
    // search upvoteMaps to check existing user mapping to postId. 
    var jane = Upvotemaps.findOne({userId: user._id})
    /*could probably get rid of if-else statement*/

    if (true) {
      alert("Voting is closed at the moment.  Please try again later.");
    }else {

      if (jane){
        console.log('first');
        //update mapping

        var upvotemap = {
          userId: user._id, 
          postId: postId
        };
        Upvotemaps.update(
          jane,
          upvotemap);

      //remove old one 
      Posts.update({
        _id: jane.postId/*, 
        upvoters: {$ne: user._id}*/
      }, {
        $pull: {upvoters: user._id},
        $inc: {votes: -1}
      });

      // increase new one
      Posts.update({
        _id: postId/*, 
        upvoters: {$ne: user._id}*/
      }, {
        $addToSet: {upvoters: user._id},
        $inc: {votes: 1}
      });

      } else {
        console.log('second');
        //add mapping
        // pick out the whitelisted keys
        var upvotemap = {
          userId: user._id, 
          postId: postId
        };
        
        Upvotemaps.insert(upvotemap);

        // increase new one
        Posts.update({
          _id: postId/*, 
          upvoters: {$ne: user._id}*/
        }, {
          $addToSet: {upvoters: user._id},
          $inc: {votes: 1}
        });
        console.log(Upvotemaps.findOne());

      }
    }
    // if postId != postId, then do a fix of upvote/downvote. 
    // update post with the number of upvotes
    //Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    
    return true;
  }
});


Upvotemaps.allow({
  update: ownsDocument,
  remove: ownsDocument
});
