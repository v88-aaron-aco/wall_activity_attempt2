const User = require("../models/user.js");
class ViewController {
    #req;
    #res;
    
    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    login = async () => {
        let user_login = new User();
        let login_user_result = await user_login.retrieve(this.#req.body);
        if(login_user_result === false){
            console.log('Invalid credentials!');
            this.#res.redirect("/");
        }else{
            console.log('Login success!');
            this.#res.redirect("/wall");
            this.#req.session.userid = login_user_result;
            this.#req.session.save();
        }
    }

    homepage = async () => {
        this.#res.render("login.ejs");
    }

    register = async () => {
        let new_user = new User();
        let create_user_result = await new_user.create(this.#req.body);
        if(result){
           console.log('You may now log in!');
           this.#res.redirect("/");
        }
    }

    logout = async () => {
        delete this.#req.session.user;
        this.#res.redirect("/");
    }
}

module.exports = ViewController;