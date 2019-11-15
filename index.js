'use strict';

const express = require('express');
const connection = require('./model/db.js');

const app = express();

app.use(express.static('public'));

app.get('/animal', async (req, res) => {
        try {
            const [results, fields] = await connection.query(
        'SELECT * FROM animal');
            console.log(results);
            console.log(fields);
            res.json(results);
        }
        catch(e){
            console.log(e);
            res.send('db error:(');
        }
    });

app.get('/', (req, res) => {
    res.send('Hello from my Node server');
});

app.get('/demo', (req, res) => {
    console.log('request', req);
    res.send('demo');
});

app.listen(3000, () => {
    console.log('server app start?');
});

