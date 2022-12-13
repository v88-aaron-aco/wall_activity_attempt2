const User = require("../models/user.js");
const Post = require("../models/post.js");
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
        let wall = new Post();
        let posts = await wall.retrieve();
        this.#res.render("wall.ejs" , {user_data : user_data, posts : posts});
    }
    createMessage = async () => {
        let post = new Post();
        let create_message = await post.create(this.#req.session.user.uid, this.#req.body);
        this.#res.redirect("/wall");
    }

    createComment = async () => {
        let post = new Post();
        let create_comment = await post.reply(this.#req.session.user.uid, this.#req.body);
        this.#res.redirect("/wall");
    }

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