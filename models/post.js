const DBConnection = require("./connection.js");
const Mysql = require("mysql");
class Post{

    
     async retrieve () {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(`
        SELECT messages.id AS message_id, messages.user_id, CONCAT(users.first_name, " ", users.last_name) AS full_name, messages.message, DATE_FORMAT(messages.created_at, "%M %D %Y") AS created_at, messages.created_at AS created_at_sort,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    "comment_id", comments.id,
                    "user_id", users.id,
                    "full_name", CONCAT(users.first_name, " ", users.last_name),
                    "comment", comments.comment,
                    "created_at", DATE_FORMAT(comments.created_at, "%M %D %Y")
                )
            )
            FROM comments
            INNER JOIN users ON users.id = comments.user_id
            WHERE comments.message_id = messages.id 
        ) AS comments
        FROM messages 
        INNER JOIN users ON users.id = messages.user_id ORDER BY created_at_sort DESC;`);
        response_data = await DBConnection.executeQuery(query);

        return response_data; 
    }

     async create (user_id,{message}) {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(`
                INSERT INTO messages(user_id, message, created_at, updated_at) 
                    VALUES(?,?,NOW(),NOW())`, [
                        user_id, 
                        message
                    ]);
        response_data = await DBConnection.executeQuery(query);

        return response_data; 
    }

     async reply (user_id,{message_id,comment}) {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(`
                INSERT INTO comments(user_id,message_id, comment, created_at, updated_at)
                    VALUES(?,?,?,NOW(),NOW())`, [
                        user_id,
                        message_id, 
                        comment
                    ]);
        response_data = await DBConnection.executeQuery(query);

        return response_data; 
    }

    // static async delete ({message_id}) {
    //     let response_data = { status: false, result: null, error: null };
    //     let query = Mysql.format(`
    //     DELETE messages, comments 
    //     FROM messages 
    //     INNER JOIN comments 
    //     WHERE messages.id = comments.message_id 
    //     AND messages.id = ?;` , message_id);
    //     response_data = await dbcon.executeQuery(query)
    //     return response_data; 
    // }

    
}
module.exports = Post;