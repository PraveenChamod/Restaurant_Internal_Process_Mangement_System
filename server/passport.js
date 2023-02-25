
import passport from "passport";
import passportGoogleAuth from 'passport-google-oauth20';
import User from "./models/User.js";

const GoogleStrategy = passportGoogleAuth.Strategy();
passport.use(
    
	new GoogleStrategy(
		{
			clientID: '833391486306-f2fppct33169g080krconmfuqe1eu0qq.apps.googleusercontent.com',
			clientSecret: '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',
			callbackURL: "api/v1/Auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			User.findOrCreate({ Email: email }, function (err, user) {
                return cb(err, user);
              });
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
