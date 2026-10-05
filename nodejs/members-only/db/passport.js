const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('./queries');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await db.getUserByEmail(email);
            if (!user) return done(null, false, { message: 'Email tidak ditemukan' });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return done(null, false, { message: 'Password salah'});

            return done(null, user);
        } catch(err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await require('./pool').query('SELECT * FROM users WHERE id = $1', [id]);
        done(null, rows[0]);
    } catch (err) {
        done (err);
    }
});

module.exports = passport;