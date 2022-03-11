var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite" 

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE article (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            authors text, 
            abstract text, 
            article text, 
            active boolean
            )`,(err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO article (title, authors, abstract, article, active) VALUES (?,?,?,?,?)'
            db.run(insert, ["Template Title 1","Holly,Molly","Template abstract 1","Template article 1", false])
            db.run(insert, ["Template Title 2","Holly","Template abstract 2","Template article 2", false])
            db.run(insert, ["Template Title 3","Molly","Template abstract 3","Template article 3", false])
        }
    })  
    }
})


module.exports = db

