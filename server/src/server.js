// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import mysql from 'mysql';
let app = express();


const public_path = path.join(__dirname, '/../../client/public');

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json



let pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "asbjorfk",
    password: "749iiMiA",
    database: "asbjorfk",
    debug: false
});


const ArtikkelDao =require("../dao/ArtikkelDao");
const CategoryDao =require("../dao/CategoryDao");
const CommentDao = require("../dao/CommentDao");

const cors = require('cors');
app.use(cors());


let artikkelDao = new ArtikkelDao(pool);
let categoryDao = new CategoryDao(pool);
let commentDao = new CommentDao(pool);

app.get("/artikler", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    artikkelDao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/search/:search", (req:express$Request, res:express$Response) => {
    console.log("/got a search request");
    artikkelDao.getAllSearch(req.params.search,(status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/newest", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    artikkelDao.getNewest((status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.get("/limAnt/:limNumb", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    artikkelDao.getAllLim(Number.parseInt(req.params.limNumb),(status, data) => {
        res.status(status);
        res.json(data);
    });
});



app.get("/artikler/:id_a", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    artikkelDao.getOne(req.params.id_a,(status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/comments/:id_a", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    commentDao.getComment(req.params.id_a,(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.post("/comment", (req:express$Request, res:express$Response) => {
    console.log("Fikk POST-request fra klienten");
    commentDao.createOneComment(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.post("/artikkel", (req:express$Request, res:express$Response) => {
    console.log("Fikk POST-request fra klienten");
    artikkelDao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/category/:category", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    artikkelDao.getAllCat(req.params.category,(status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/category", (req:express$Request, res:express$Response) => {
    console.log("/category: fikk request fra klient");
    categoryDao.getCatName(req.params.id_a,(status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.delete("/artikler/:id_a", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    artikkelDao.removeOne(Number.parseInt(req.params.id_a),(status, data) => {
        res.status(status);
        res.json(data);
    });
});




app.put("/artikler/:id_a", (req:express$Request, res:express$Response) => {
    console.log("Fikk POST-request fra klienten");
    artikkelDao.updateOne(req.body, (status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.put("/rate/:id_a/:input", (req:express$Request, res:express$Response) => {
    console.log("Fikk POST-request fra klienten");
    artikkelDao.updateRate(req.params.id_a, req.params.input,(status, data) => {
        res.status(status);
        res.json(data);
    });
});


app.get("/relArtikler/:limNumb", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    artikkelDao.getAllOnRelevanse(Number.parseInt(req.params.limNumb),(status, data) => {
        res.status(status);
        res.json(data);
    });
});

app.delete("/comment/:id_a", (req:express$Request, res:express$Response) => {
    console.log("/person: fikk request fra klient");
    commentDao.removeAll(Number.parseInt(req.params.id_a),(status, data) => {
        res.status(status);
        res.json(data);
    });
});


// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
    // Setup hot reload (refresh web page on client changes)
    reload(app).then(reloader => {
        app.listen(3000, (error: ?Error) => {
            if (error) reject(error.message);
            console.log('Express server started');
            // Start hot reload (refresh web page on client changes)
            reloader.reload(); // Reload application on server restart
            fs.watch(public_path, () => reloader.reload());
            resolve();
        });
    });
});

let server = app.listen(8080);