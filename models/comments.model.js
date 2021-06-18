const db = require("../db/connection.js");

exports.removeCommentById = async (comment_id) => {
  const results = await db.query(`DELETE FROM comments WHERE comment_id = $1`, [
    comment_id,
  ]);
};
