const dbcon = require("./connection.js");
const Mysql = require("mysql");

class Comment{
    static async create (user_id, {message_id,comment}) {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(`
                INSERT comments(user_id, message_id,comment, created_at, updated_at) 
                    VALUES(?,?,?,NOW(),NOW())`, [
                        user_id, 
                        message_id,
                        comment
                    ]);
        response_data = await dbcon.executeQuery(query)
        return response_data.result; 
    }

    // static async retrieveMessages () {
    //     let response_data = { status: false, result: null, error: null };
    //     let query = Mysql.format(`
    //         SELECT users.first_name, users.last_name, messages.* 
    //         FROM jsmysql.messages 
    //         INNER JOIN users 
    //         ON users.id = messages.user_id`);
    //     response_data = await dbcon.executeQuery(query)
    //     return response_data; 
    // }

    
}
module.exports = Comment;