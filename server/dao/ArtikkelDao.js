//@flow

const Dao = require("./dao.js");

module.exports = class ArtikkelDao extends Dao {

    getAll(callback : () => void) {
        super.query("select * from artikler ORDER BY rate DESC ", [], callback);
    }

    getAllOnRelevanse(limNumb : number, callback : () => void ){
        super.query(
            "SELECT id_a, navnPost, DATE_FORMAT(postTid, '%d-%m-%Y %H:%i') as postTid, overskrift,brodtekst, bilde, alt,relevanse, forfatter,rate FROM artikler WHERE relevanse = 1 ORDER BY id_a DESC LIMIT ?", [limNumb], callback);
    }

    getAllLim(limNumb : number, callback : () => void) {
        super.query("SELECT * FROM artikler ORDER BY id_a DESC LIMIT ?; ", [limNumb], callback);
    }



    getOne(id_a : number, callback : () => void) {
        super.query(
            "select  id_a, navnPost, DATE_FORMAT(postTid, '%d-%m-%Y %H:%i') as postTid, overskrift, brodtekst, bilde, alt,relevanse, forfatter,rate from artikler where id_a = ?",
            [id_a],
            callback
        );
    }

    getAllCat(cat: string, callback : () => void) {
        super.query(
            "SELECT * FROM artikler WHERE navnPost = ? ORDER BY id_a DESC",
            [cat],
            callback
        );
    }



    createOne(json : Object, callback : () => void) {
        let val = [json.navnPost, json.overskrift, json.brodtekst, json.bilde, json.alt,  json.relevanse, json.forfatter,json.rate];
        super.query(
            "insert into artikler (navnPost, overskrift, brodtekst, bilde, alt, relevanse, forfatter,rate) values (?,?,?,?,?,?,?,?)",
            val,
            callback
        );
    }

    updateOne(json : Object, callback : () => void) {
        let val = [json.navnPost, json.overskrift, json.brodtekst, json.bilde, json.alt,  json.relevanse, json.id_a];
        super.query(
            "UPDATE artikler SET navnPost =?,overskrift= ? ,brodtekst = ?,bilde = ?,alt=? , relevanse = ?  WHERE id_a = ?",
            val,
            callback
        );
    }
    updateRate(id_a: number, input:number, callback : () => void) {
        super.query(
            "UPDATE artikler SET rate = (rate + ?) WHERE id_a = ?",
            [input,id_a],
            callback
        );
    }




    removeOne(id : number, callback : () => void) {
        super.query(
            "DELETE FROM artikler WHERE id_a = ?",
            [id],
            callback
        );
    }

    getNewest(callback : () => void) {
        super.query("Select id_a, navnPost, DATE_FORMAT(postTid, '%H:%i') as postTid, overskrift,brodtekst ,bilde, alt, relevanse, forfatter,rate from artikler where postTid >= DATE_SUB(NOW(), INTERVAL 6 hour ) and relevanse = 1 order by postTid desc", [], callback);
    }

    getAllSearch(search: string, callback: function) {
        super.query(
            "select * from artikler where overskrift like '%' ? '%' ",
            [search],
            callback
        );
    }



};
