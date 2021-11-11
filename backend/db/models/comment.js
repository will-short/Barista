"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: DataTypes.STRING,
      owner_id: DataTypes.INTEGER,
      checkin_id: DataTypes.INTEGER,
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.Checkin, { foreignKey: "checkin_id" });
    Comment.belongsTo(models.User, { foreignKey: "owner_id" });
  };
  Comment.checkinComments = async function (User, checkin_id) {
    const comments = await Comment.findAll({
      where: { checkin_id },
      include: User,
      order: [["createdAt", "DESC"]],
    });
    return comments;
  };

  Comment.makeNewComment = async function (data, User) {
    const newComment = await Comment.create(data);
    const res = await Comment.findOne({
      where: { id: newComment.id },
      include: User,
    });
    return res;
  };
  Comment.update = async function (content, id) {
    let comment = await Comment.findByPk(id);
    await comment.update({ content });

    return comment;
  };
  return Comment;
};
