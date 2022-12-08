const User = require("../models/user.js");
const Message = require("../models/message.js");
const Comment = require("../models/comment.js");
class WallController {
    #req;
    #res;
    
    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    wall = async () => {
        let name = await User.loadProfile(this.#req.session.userid);
        let all_messages = await Message.retrieveMessages();
        this.#res.render("wall.ejs", {data : name[0], messages : all_messages.result});
        // this.#res.render("wall.ejs", {messages : all_messages.result});
    }

    createMessage = async () => {
        let create_message = await Message.create(this.#req.session.userid,this.#req.body); 
        this.#res.redirect("/wall");
    }

    createComment = async () => {
        let create_comment = await Comment.create(this.#req.session.userid,this.#req.body); 
        console.log(create_comment);
        this.#res.redirect("/wall");
    }

    
}

module.exports = WallController;