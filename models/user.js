const DBConnection = require("./connection.js");
const Mysql = require("mysql");
const Sha1 = require("sha1");
const { checkFields } = require("../helpers/index.helper");
/**
 * @class User
 */
class User{

    /**
     * DOCU: Function to retrieve a user from the database. <br/>
     * Triggered: When fetching the user in login. <br/>
     * Last Updated Date: December 12, 2022. 
     * @async
     * @function
     * @param {object} login_data  - Requires email_address and password
     * @returns {object} response_data - { status: true|false, result: {id, email, first_name, last_name, created_at, updated_at}, error: null|string }
     * @author Aaron Aco
     */
     async retrieve (login_data) {
         let response_data = { status: false, result: null, error: null };
        try {
            let check_fields = checkFields(["email_address", "password"], login_data);

            if(check_fields.status){
                let retrieve_query = Mysql.format(`
                    SELECT id, email, first_name, last_name, created_at, updated_at FROM users WHERE email = ? AND password = ?`, [
                        login_data.email_address, 
                        Sha1(login_data.password)
                        ]);
                response_data = await DBConnection.executeQuery(retrieve_query);
            }else{
                response_data = check_fields;
            }
        } catch (error) {
            response_data.error = error;
        }

        return response_data;
    }

    // async create ({email_address, first_name, last_name, password}) {
    //     let response_data = { status: false, result: null, error: null };
    //     let query = Mysql.format(`
    //             INSERT users(first_name, last_name, email, password, created_at, updated_at) 
    //                 VALUES(?,?,?,?,NOW(),NOW())`, [
    //                     first_name, 
    //                     last_name, 
    //                     email_address,
    //                     sha1(password)
    //                 ]);
    //     response_data = await dbcon.executeQuery(query)
    //     return response_data.result; 
    // }

    //  async loadProfile (id) {
    //     let response_data = { status: false, result: null, error: null };
    //     let query = Mysql.format(`
    //             SELECT users.id, users.first_name, users.last_name FROM users WHERE id = ?`, [id]);
    //     response_data = await dbcon.executeQuery(query)
    //     return  response_data.result; 
    // }
    
}
module.exports = User;