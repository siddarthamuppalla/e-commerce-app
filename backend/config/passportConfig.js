const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/user");

passport.use(new LocalStrategy(

    (email, password, done) => {
            User.findOne(email, async (error, user) => {
            // once the findOne function executes, the call back function is invoked
            // the callback fn takes error, user as the parameters
            // in subsequent checks, we invoke this function
            // this function returns user after the checks are done
            // if there is any error, we pass the error as the first arg,
            // and false in place of the user, indicationg that there is an error
            // if there is no error, we pass null in the first arg 

            // if there is an error
            if(error) return done(error, false);

            // if user not found
            if(!user) return done({
                message: null,
                user: false
            });

            try {
                if (await bcrypt.compare(password, user.password)){
                    // when passwords match
                    return done(null, false, {
                        message: "User Authenticated." 
                    });
                } else{
                    // when passwords didn't match 
                    return done(null, false, {
                        message: "Password Incorrect."
                    });
                };
            } catch (error) {
                return done(error);
            }
        })
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
}); 

passport.deserializeUser((id, done) => {
    User.findById(id, {password:0}, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;