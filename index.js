'use strict';

const express = require('express');
const connection = require('./model/db.js');


const app = express();
const bodyparser = require('body-parser');

app.use(express.static('public'));

app.get('/animal', async (req,res)=> {
    console.log(req.query);
    res.send(`query params? ${req.query}`);
    try {
        const [results] = await connection.query(
            'SELECT * FROM animal WHERE name LIKE ?',
            [req.query.name]
        );
        res.json(results);
    }catch (e) {
        console.error(e);
        res.send(`db error ${e}`);
    }
});

app.post('/animal',bodyparser.urlencoded(), async (req,res)=>{
    console.log(req.body);
    try {
        const [result] = await connection.query(
            'INSERT INTO animal (name) VALUES (?)',
            [req.body.name]
        );
        res.json(result);
    }catch (e) {
        console.error(e);
        res.send('db error');
    }
});

app.get('/animals',async (req,res)=>{
        try {
            const [results,fields] = await connection.query(
                'SELECT * FROM animal');
            console.log(results); // containst rows r
            console.log(fields); // containst extra m
            res.json(results);
        }catch (e) {
            console.error(e);
            res.send('db error');
        }
    }
);

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
