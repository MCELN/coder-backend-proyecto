require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV,
    db: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
    },
    jwtKey: process.env.JWT_PRIVATE_KEY,
    github: {
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACKURL,
    },
}