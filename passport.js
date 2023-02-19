const passport = require("passport");
const { loginCredentials } = require("./config.js");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var GitHubStrategy = require("passport-github2").Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: loginCredentials.googleClientId,
			clientSecret: loginCredentials.googleClientSecret,
			callbackURL: "/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	)
);

passport.use(
	new GitHubStrategy(
		{
			clientID: loginCredentials.githubClientId,
			clientSecret: loginCredentials.githubClientSecret,
			callbackURL: "/auth/github/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});
