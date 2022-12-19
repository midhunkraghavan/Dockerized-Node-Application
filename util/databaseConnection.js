const dotenv = require('dotenv')
dotenv.config()

const Pool = require('pg').Pool;
let databases = require('../configs/database.json');
const pool = new Pool(databases[process.env.NODE_ENV]);

module.exports = {pool};