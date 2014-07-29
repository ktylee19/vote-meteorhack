// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

isAdmin = function(userId, doc) {
  console.log(user._id);
  console.log("hee");
  console.log(userId._id);
  console.log("iz38rAtpoSvpoawBw");
  if (userId._id == Meteor.users.findOne(_id === "iz38rAtpoSvpoawBw")){
  	return true
  }
  return false
}