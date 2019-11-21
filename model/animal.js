'use strict';

const connection = require('db.js');

module.exports = async () => {
    try {
        const [results,fields] = await connection.query(
            'SELECT * FROM animal');
        console.log(results); // containst rows r
        console.log(fields); // containst extra m
        return results;
    }catch (e) {
        console.error(e);
        return 'db error';
    }
};