const passport = require("passport");
const local = require('passport-local');
const userService = require('../services/users.service');
const GitHubStrategy = require('passport-github2');
const { comparePassword } = require("../utils/bcrypt.util");
const { github } = require('../configs/index');

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { email } = req.body;

            try {
                const user = await userService.getOne({ email: username });

                if (user) {
                    return done(null, false);
                }

                const infoUser = await userService.create(newUser);
                return done(null, newUser);

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

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await findByIdUser(id);
        done(null, user);
    })
};

module.exports = initializePassport;

