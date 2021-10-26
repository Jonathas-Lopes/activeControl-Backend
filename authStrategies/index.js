const jwtStrategy = require('./jwt')
const loginStrategy = require('./login')
const signupStrategy = require('./signup')


const strategies = {jwtStrategy, loginStrategy, signupStrategy}

module.exports = strategies;