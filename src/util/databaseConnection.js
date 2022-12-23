const dotenv = require('dotenv').config( {path: require('find-config')('.env')})

const Pool = require('pg').Pool;
let databases = require('../configs/database.json');
const pool = new Pool(databases[process.env.NODE_ENV]);

module.exports = {pool};