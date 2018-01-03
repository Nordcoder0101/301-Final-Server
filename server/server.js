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
const DATABASE_URL = process.env.DATABASE_URL;
const CLIENT_URL = process.env.CLIENT_URL;

//DATABASE setup.
// const client = new pg.Client(DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));

app.use(cors());

app.get('/api/v1/weather', (req, res) => {
  superAgent.get(`https://api.darksky.net/forecast/68bbafb8dd37fc79325853a950cf330b/-47.6062,122.3321`)
    .then( data => console.log(data))
});


app.get('/accounts', (req, res) => {
  client.query(`SELECT id, name, email, zip;`)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('/api/v1/books/:id', (req, res) => {
  console.log(req.params.id);
  client.query(`SELECT * FROM books WHERE book_id=$1;`, [req.params.id])
    .then(result => {
      console.log(result.rows);
      return res.send(result.rows);
     
    })
    .catch(console.error);
});

app.post('/api/v1/books/', (req) => {
  client.query(`INSERT INTO books (title, author, image_url, isbn) VALUES ($!, $2, $3, $4);`, [req.params.title, req.params.author, req.params.image_url, req.params.isbn]);
});

  


app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));