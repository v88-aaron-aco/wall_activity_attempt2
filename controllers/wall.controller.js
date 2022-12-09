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

    validateAccess(header){
        if(empty(this.#req.session.userid)){
            this.#res.redirect("/");
        }
    }
    wall = async () => {
        let name = await User.loadProfile(this.#req.session.userid);
        let all_messages = await Message.retrieveMessages();
        for(let i = 0; i < all_messages.result.length; i++){
            let all_comments = await Comment.retrieveComments(all_messages.result[i].id);
            all_messages.result[i]['comments'] = all_comments.result;
        }
        this.#res.render("wall.ejs", {data : name[0], messages : all_messages.result});
    }

    createMessage = async () => {
        let create_message = await Message.create(this.#req.session.userid,this.#req.body); 
        this.#res.redirect("/wall");
    }

    deleteMessage = async () => {
        let delete_message = await Message.delete(this.#req.body);
        this.#res.redirect("/wall");
    }

    createComment = async () => {
        let create_comment = await Comment.create(this.#req.session.userid,this.#req.body); 
        this.#res.redirect("/wall");
    }

    deleteComment = async () => {
        let delete_comment = await Comment.delete(this.#req.body);
        this.#res.redirect("/wall");
    }

    
}

module.exports = WallController;