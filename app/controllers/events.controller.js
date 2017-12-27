module.exports = {

    //show all events
    showEvents: (req, res) => {
        //create dummy events
        const events = [];
        //connect to our database
        const mysql = require('mysql'),
            con = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            });
        con.connect((err) => {
            if (err) throw err;
            //console.log('Connected to MySQL Database');
        });
        con.query("SELECT * FROM event ORDER BY name", (err, result, fields) => {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                var event = {
                    'name': result[i].name,
                    'slug': result[i].slug,
                    'description': result[i].description
                }
                events.push(event);
            }
            //return a view with data
            res.render('pages/events', { events: events });
        });


        //disconnect from database
        con.end((err) => {
            if (err) throw err;
            //console.log('Disconnected from Database');
        });
    },

    //show a single event
    showSingle: (req, res) => {
        //get a single event
        var event;

        const mysql = require('mysql'),
            con = mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            });
        con.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL Database');
        });
        const sql = "SELECT * FROM event WHERE slug = " + mysql.escape(req.params.slug);
        console.log(sql);
        con.query(sql, (err, result, fields) => {
            if (err) throw err;
            if (result.length == 1) {
                event = {
                    'name': result[0].name,
                    'slug': result[0].slug,
                    'description': result[0].description
                }
            }
            //console.log(event);

            //return a view with data
            res.render('pages/single', { event: event });
        });


        //disconnect from database
        con.end((err) => {
            if (err) throw err;
            console.log('Disconnected from Database');
        });
    }
};