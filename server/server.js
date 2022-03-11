var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 3001

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port http://localhost:%PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/articles", (req, res, next) => {
    var sql = "select * from article"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.get("/api/articles/:id", (req, res, next) => {
    var sql = "select * from article where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});


app.post("/api/articles/", (req, res, next) => {
    var errors=[]
    if (!req.body.title){
        errors.push("No title specified");
    }
    if (!req.body.authors){
        errors.push("No authors specified");
    }
    var data = {
        title: req.body.title,
        authors: req.body.authors,
        abstract: req.body.abstract,
        article: req.body.article,
        active: false,
    }
    var sql ='INSERT INTO article (title, authors, abstract, article, active) VALUES (?,?,?,?,?)'
    var params =[data.title, data.authors, data.abstract, data.article, data.active]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


app.patch("/api/articles/:id", (req, res, next) => {
    var data = {
        title: req.body.title,
        authors: req.body.authors,
        abstract: req.body.abstract,
        article: req.body.article,
        active: false,
    }
    db.run(
        `UPDATE article set 
           title = coalesce(?,title), 
           authors = coalesce(?,authors), 
           abstract = coalesce(?,abstract), 
           article = COALESCE(?,article), 
           active = ? 
           WHERE id = ?`,
        [data.title, data.authors, data.abstract, data.article, data.active, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


app.delete("/api/articles/:id", (req, res, next) => {
    db.run(
        'DELETE FROM article WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})


app.patch("/api/agree/:id", (req, res, next) => {
    var data = {
        active: true,
    }
    db.run(
        `UPDATE article set 
           active = ? 
           WHERE id = ?`,
        [data.active, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

