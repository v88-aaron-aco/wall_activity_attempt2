const User = require("../models/user.js");
/**
 * @class ViewController
 */
class ViewController {
    #req;
    #res;

    constructor(req, res) {
        this.#req = req;
        this.#res = res;
    }
    /**
     * DOCU: Function to render the login page. <br/>
     * Triggered: When initial loading of the page <br/>
     * Last Updated Date: December 12, 2022. 
     * @async
     * @function
     * @author Aaron Aco
     */
    homepage = async () => {
        this.#res.render("login.ejs");
    };

    /**
     * DOCU: Function to to proccess and validate the login form data. <br/>
     * Triggered: When the login button is clicked. <br/>
     * Last Updated Date: December 12, 2022. 
     * @async
     * @function
     * @returns {void}
     * @author Aaron Aco
     */
    login_proccess = async () => {
        let user_login = new User();
        let login_response_data = await user_login.retrieve(this.#req.body);

        if (!login_response_data.status) {
            console.log("error", login_response_data);
            this.#res.redirect("/");
            return;
        }

        if (login_response_data.status && login_response_data.result.length) {
            console.log("success", login_response_data);
        } else {
            console.log("failed", login_response_data);
            login_response_data.error = "Incorrect Credentials.";
            this.#res.redirect("/");
        }
    };

    // register = async () => {
    //     let new_user = new User();
    //     let create_user_result = await new_user.create(this.#req.body);
    //     if (result) {
    //         console.log("You may now log in!");
    //         this.#res.redirect("/");
    //     }
    // };

    // logout = async () => {
    //     delete this.#req.session.user;
    //     this.#res.redirect("/");
    // };
}

module.exports = ViewController;
