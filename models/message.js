const dbcon = require("./connection.js");
const Mysql = require("mysql");

class Message{
    static async create (user_id,{message}) {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(`
                INSERT messages(user_id, message, created_at, updated_at) 
                    VALUES(?,?,NOW(),NOW())`, [
                        user_id, 
                        message
                    ]);
        response_data = await dbcon.executeQuery(query)
        return response_data.result; 
    }

    static async retrieveMessages () {
        let response_data = { status: false, result: null, error: null };
        let query = Mysql.format(`
            SELECT users.first_name, users.last_name, messages.* 
            FROM jsmysql.messages 
            INNER JOIN users 
            ON users.id = messages.user_id`);
        response_data = await dbcon.executeQuery(query)
        return response_data; 
    }

    
}
module.exports = Message;