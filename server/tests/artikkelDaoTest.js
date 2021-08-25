//@flow
let mysql = require("mysql");
const ArtikkelDao = require("../dao/ArtikkelDao.js");
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

let artikkelDao = new ArtikkelDao(pool);

beforeAll(done => {
  runsqlfile("dao/create_tables.sql", pool, () => {
    runsqlfile("dao/create_testdata.sql", pool, done);
  });
});

afterAll(() => {
  pool.end();
});


test("get all article from db", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(2);
    done();
  }
  artikkelDao.getAll(callback);
});



test("get all artilikler on relevanse", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data.length=" + JSON.stringify(data)
    );
    expect(data[0].relevanse).toBe('1');
    done();
  }
  artikkelDao.getAllOnRelevanse(2,callback);
});



test("get lim ant artikkler from db", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data.length=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    done();
  }
  artikkelDao.getAllLim(1,callback);
});



test("get one Article from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(1);
    expect(data[0].navnPost).toBe('Sport');
    done();
  }
  artikkelDao.getOne(1, callback);
});




test("get all on category", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data" + JSON.stringify(data)
    );
    expect(data[0].navnPost).toBe('Sport');
    done();
  }
  artikkelDao.getAllCat('Sport',callback);
});




test("add Article to db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  artikkelDao.createOne(
    {id_a: 3, navnPost: 'Cultur', overskrift: 'En Test overskrift', brodtekst: 'brodtekst',bilde: 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg', alt:'seg', relevanse: '1',forfatter: 'deig', rate:1},
    callback
  );
});



test("update one article from db", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data.length=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }
  artikkelDao.updateOne({navnPost: 'Cultur', overskrift: 'En Test overskrift', brodtekst: 'brodtekst',bilde: 'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',alt:'enAltidalti', relevanse: '1', id_a:'1',forfatter:'forfattertest' }, callback);
});


test("update rate from db", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data.length=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }
  artikkelDao.updateRate(1,{rate: '2'}, callback);
});




test("get newst Article from db", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBeGreaterThanOrEqual(1);
    done();
  }

  artikkelDao.getNewest(callback);
});

test("remove one article from db", done => {
  function callback(status, data) {
    console.log(
        "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.affectedRows).toBe(1);
    done();
  }

  artikkelDao.removeOne(3, callback);
});







