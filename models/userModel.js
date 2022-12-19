const {
    pool
} = require('../util/databaseConnection')
const messages = require('../configs/messages.json');
const crypto = require('../util/crypto')
const jwt = require('jsonwebtoken');
const jwtCredentials = require('../configs/jwt.json')

exports.login = async function (data, callback) {

    const client = await pool.connect();
    await client.query('BEGIN')
    try {
        let selectQuery = `select * from users where "userName" = '${data.userName}'`;
        let response = await client.query(selectQuery)

        if (typeof response.rows === 'undefined' || response.rows.length === 0) {
            callback(messages.loginFailed);
        } else {
            if (await crypto.hashCompare(data.password, response.rows[0].password)) {

                let payload = {
                    id: response.rows[0].id,
                    name: response.rows[0].name
                }

                let token = jwt.sign(payload, jwtCredentials.secretKey, {
                    expiresIn: 86400
                })
                await client.query('COMMIT')
                callback(null, token);
            } else {
                callback(messages.loginFailed);
            }
        }
        
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('userModel.login/try-catch', error)
        callback(messages.dbError);
    } finally {
        client.release();
    }

};