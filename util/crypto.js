
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*
 * generate password with hash
 */
exports.hashPassword = async function (password, callback) {
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}
/*
 * compare password with hash
 */
exports.hashCompare = async function (password, hash, callback) {
    return await bcrypt.compare(password, hash); 
}