//@flow
let mysql = require("mysql");
const CategoryDao = require("../dao/CategoryDao.js");
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

let categoryDao = new CategoryDao(pool);

beforeAll(done => {
    runsqlfile("dao/create_tables.sql", pool, () => {
        runsqlfile("dao/create_testdata.sql", pool, done);
    });
});

afterAll(() => {
    pool.end();
});

test("get category Name", done => {
    function callback(status, data) {
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].navn).toBe('News');
        done();
    }
    categoryDao.getCatName(6, callback);
});