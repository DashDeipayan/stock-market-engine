const express = require("express");
const router = express.Router();
const passport = require("passport");
const config = require("../config.js");
require("../passport.js");

const CLIENT_URL = config.hostUrl;

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		success: false,
		message: "failure",
	});
});
router.get("/login/success", (req, res) => {
	if (req.user) {
		const headers = {
			"Cache-Control": "max-age=0",
		};
		res.setHeader(headers);
		res.status(200).json({
			success: true,
			message: "success",
			user: req.user,
			// cookies: req.cookie,
		});
	}
});

router.get(
	"/google",
	passport.authenticate("google", {
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		],
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);
router.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
	"/github/callback",
	passport.authenticate("github", {
		successRedirect: CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	res.clearCookie(config.cookieName, {
		domain: CLIENT_URL,
	});
	req.logout();
	res.redirect(CLIENT_URL);
});

module.exports = { routes: router };
