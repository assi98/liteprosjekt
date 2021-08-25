//@flow
let mysql = require("mysql");
const CommentDao = require("../dao/CommentDao.js");
const runsqlfile = require("../dao/runsqlfile.js");



let pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

let commentDao = new CommentDao(pool);

beforeAll(done => {
    runsqlfile("dao/create_tables.sql", pool, () => {
        runsqlfile("dao/create_testdata.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});

test("get all comments from db", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(2);
        done();
    }
    commentDao.getComment(2, callback);
});


test("create one comment", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }

    commentDao.createOneComment({id_com:3, comment: 'what a lovely comment', id_a : 2, nickname : 'nickynicknickman'}, callback);
});


test("Remove all comment on id", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBeGreaterThanOrEqual(1);
        done();
    }
    commentDao.removeAll(2, callback);
});