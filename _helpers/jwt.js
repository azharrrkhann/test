const expressJwt = require('express-jwt');
const config = require('config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret }).unless({
        path: [
            '/users/authenticate',
            '/users/register',
            new RegExp('/public.*/', 'i') 
        ]
    });
}
