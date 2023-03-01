"use strict";
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
	PORT,
	HOST,
	HOST_URL,
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
	SCHEDULE_TIME,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	COOKIE_NAME,
	COOKIE_KEY,
	COOKIE_MAX_AGE,
} = process.env;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");

module.exports = {
	port: PORT,
	host: HOST,
	hostUrl: HOST_URL,
	scheduleTime: SCHEDULE_TIME,
	firebaseConfig: {
		apiKey: API_KEY,
		authDomain: AUTH_DOMAIN,
		projectId: PROJECT_ID,
		storageBucket: STORAGE_BUCKET,
		messagingSenderId: MESSAGING_SENDER_ID,
		appId: APP_ID,
		measurementId: MEASUREMENT_ID,
	},
	loginCredentials: {
		googleClientId: GOOGLE_CLIENT_ID,
		googleClientSecret: GOOGLE_CLIENT_SECRET,
		githubClientId: GITHUB_CLIENT_ID,
		githubClientSecret: GITHUB_CLIENT_SECRET,
	},
	cookieData: {
		name: COOKIE_NAME,
		keys: [COOKIE_KEY.toString()],
		maxAge: COOKIE_MAX_AGE,
	},
};
