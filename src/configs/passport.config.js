const passport = require("passport");
const local = require('passport-local');
const userService = require('../services/users.service');
const jwt = require('passport-jwt');
const GitHubStrategy = require('passport-github2');
const { github, jwtKey } = require('../configs/index');
const cookieExtractor = require("../utils/cookie-extractor.util");

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const secretKey = jwtKey;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {

            try {
                const user = await userService.getOne({ email: username });

                if (user) {
                    return done(null, false);
                }

                const infoUser = await userService.create(req.body);
                return done(null, infoUser);

            } catch (error) {
                return done('Internal error' + error);
            };
        }
    ));

    passport.use('github', new GitHubStrategy({
        clientID: github.clientID,
        clientSecret: github.clientSecret,
        callbackURL: github.callbackURL,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const user = await findOneUser({ email: profile._json.email });

            if (!user) {
                const newUserInfo = {
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    age: 0,
                    password: '',
                    cart: await CartDao.createCart(),
                    role: 'user',
                }
                const newUser = await createUser(newUserInfo);

                return done(null, newUser);
            } else {
                return done(null, user);
            }

        } catch (error) {
            return done(error);
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: secretKey,
    }, async (jwt_payload, done) => {
        try {
            done(null, jwt_payload);
        } catch (error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await findByIdUser(id);
        done(null, user);
    })
};

module.exports = initializePassport;

