const dbcon = require("./connection.js");
const Mysql = require("mysql");

class Comment {
    static async create(user_id, { message_id, comment }) {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(
            `INSERT INTO comments(user_id, message_id,comment, created_at, updated_at) 
                    VALUES(?,?,?,NOW(),NOW())`,
            [user_id, message_id, comment]
        );
        response_data = await dbcon.executeQuery(query);
        return response_data.result;
    }

    static async retrieveComments(message_id) {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(`
            SELECT 
            users.first_name, users.last_name, comments.* 
            FROM comments 
            INNER JOIN users 
            ON users.id = comments.user_id 
            AND comments.message_id = ? 
            ORDER BY comments.created_at ASC;`, message_id);
        response_data = await dbcon.executeQuery(query);
        return response_data;
    }

    static async delete(comment_id) {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(
            `DELETE comments WHERE id = ?`, comment_id
        );
        response_data = await dbcon.executeQuery(query);
        return response_data.result;
    }
}
module.exports = Comment;
