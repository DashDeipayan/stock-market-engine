const passport = require("passport");
const { loginCredentials } = require("./config.js");
const { addOrUpdateInvestor } = require("./models/investor.js");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var GitHubStrategy = require("passport-github2").Strategy;

passport.use(
	new GoogleStrategy(
		{
			clientID: loginCredentials.googleClientId,
			clientSecret: loginCredentials.googleClientSecret,
			callbackURL: "/auth/google/callback",
		},
		async function (accessToken, refreshToken, profile, done) {
			const investorData = {
				name: profile.displayName,
				email: profile.emails[0].value,
				id: profile.id,
			};
			const investor = await addOrUpdateInvestor(investorData);
			return done(null, investor);
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
		async function (accessToken, refreshToken, profile, done) {
			const investorData = {
				name: profile._json.name,
				email: profile._json.email,
				id: profile.id,
			};
			const investor = await addOrUpdateInvestor(investorData);
			return done(null, investor);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});
