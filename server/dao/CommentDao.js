//@flow
const Dao = require("./dao.js");

module.exports = class CommentDao extends Dao {

    getComment(id_a : number, callback : () => void) {
        super.query(
            "SELECT comment, nickname FROM Comment INNER JOIN artikler ON Comment.id_a = artikler.id_a WHERE Comment.id_a = ?;",
            [id_a],
            callback
        );
    }

    createOneComment(json : Object, callback : () => void) {
        var val = [json.comment, json.id_a, json.nickname];
        super.query(
            "insert into Comment (comment, id_a, nickname) values (?,?,?)",
            val,
            callback
        );
    }

    removeAll(id : number, callback : () => void) {
        super.query(
            "DELETE FROM Comment WHERE id_a = ?",
            [id],
            callback
        );
    }

};
