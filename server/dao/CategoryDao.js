//@flow

const Dao = require("./dao.js");

module.exports = class CategoryDao extends Dao {

    getCatName(id : number, callback : () => void) {
        super.query(
            "SELECT DISTINCT navn FROM category",
                [id],
            callback
        );
    }

};