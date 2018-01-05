'use strict';

const darkSky_URL = 'https://api.darksky.net/forecast/key/lat,long'
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyParser = require('body-parser');
const superAgent = require('superagent');

//APP Setup
const app = express();  
const PORT = process.env.PORT;
//this next line of coded added from scots lecture example
// const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_URL = process.env.DATABASE_URL;
const CLIENT_URL = process.env.CLIENT_URL;

// DATABASE setup.
const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/api/v1/weather', (req, res) => {
  console.log(req.query)
  superAgent.get(`https://api.darksky.net/forecast/68bbafb8dd37fc79325853a950cf330b/${req.query.a},${req.query.b}`)
    .then( data => {return res.send(data)})
});


//this does nothing for us
// app.get('/api/v1/location', (req, res) => {
//   superAgent.get(`http://maps.googleapis.com/maps/api/geocode/json?address=98125`)
//   .then(results => console.log(results))  
//   .then( results => {return res.send(results)})
// });


// app.get('/accounts', (req, res) => {
//   client.query(`SELECT id, name, email, zip;`)
//     .then(results => res.send(results.rows))
//     .catch(console.error);
// });

app.get('/api/v1/accounts', (req, res) => {
  console.log()
  client.query(`SELECT * FROM accounts;`)
    .then(result => {
      console.log(result.rows);
      return res.send(result.rows);
     
    })
    .catch(console.error);
});

// app.post('/api/v1/books/', (req) => {
//   client.query(`INSERT INTO books (title, author, image_url, isbn) VALUES ($!, $2, $3, $4);`, [req.params.title, req.params.author, req.params.image_url, req.params.isbn]);
// });

// app.post('/api/v1/newaccount/', (req, res) => {
//   client.query(`INSERT INTO accounts (name, zip, email, password) VALUES ($!, $2, $3, $4);`, [req.params.name, req.params.zip, req.params.email, req.params.password])
//   .then( result => {
//     console.log(result.rows);
//     return res.send(result.rows);
//   })
//   .catch(console.error);
// });

app.get(`/api/v1/verify`, (req, res) => {
  console.log(req.query.name)
  client.query(`SELECT * FROM accounts WHERE name='${req.query.name}';`)
  .then( result => {
    console.log(result)
    return res.send(result.rows)
})
.catch(console.error);
});

app.get(`/api/v1/newaccount`, (req, res) => {
  console.log(req.query)
  client.query(`INSERT INTO accounts
  (name, zip, email, password)
  VALUES
  ('${req.query.name}','${req.query.zip}', '${req.query.email}', '${req.query.password}');`)
  .then( result => {
    console.log(result)
    return res.send(result)
})
  .catch(res.send(console.error);
});


app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));