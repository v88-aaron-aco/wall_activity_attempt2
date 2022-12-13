const User = require("../models/user.js");
const Wall = require("../models/wall.js");
/**
 * @class WallController
 */
class WallController {
    #req;
    #res;
    
    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }
    /**
     * DOCU: Function to render the wall view, fetch the user's datain session, and load all the messages and comments. <br/>
     * Triggered: After successfull login. <br/>
     * Last Updated Date: December 13, 2022.
     * @async
     * @function
     * @author Aaron Aco
     */
    wall = async () => {
        let user_data = this.#req.session.user;
        let wall = new Wall();
        let wall_data = await wall.retrieve();
        console.log(wall_data);
        this.#res.render("wall.ejs" , {user_data : user_data, wall_data : wall_data});
    }
    // createMessage = async () => {
    //     let create_message = await Message.create(this.#req.session.userid, this.#req.body);
    //     this.#res.redirect("/wall");
    // }

    // createComment = async () => {
    //     let create_comment = await Comment.create(this.#req.session.userid, this.#req.body);
    //     this.#res.redirect("/wall");
    // }

    // deleteComment = async () => {
    //     let delete_comment = await Comment.delete(this.#req.body);
    //     this.#res.redirect("/wall");
    // }

    // deleteMessage = async () => {
    //     let delete_message = await Message.delete(this.#req.body);
    //     this.#res.redirect("/wall");
    // }



}

module.exports = WallController;