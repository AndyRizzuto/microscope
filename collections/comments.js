Comments = new Meteor.Collection('comments');
Meteor.methods({
  comment: function(commentsAttributes) {
    var user = Meteor.user();
    var post = Posts.findOne(commentsAttributes.postId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    if (!commentsAttributes.body)
      throw new Meteor.Error(422, "Please write some content");
    if (!post)
      throw new Meteor.Error(422, "You must comment on a post");
    comment = _.extend(_.pick(commentsAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });
    // update the post with the number of comments
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});
    
    return Comments.insert(comment);
  }
});