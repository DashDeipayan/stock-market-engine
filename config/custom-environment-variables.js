module.exports = {
	port: {
		__name: "PORT",
		__format: "number",
	},
	githubOauth: {
		clientId: "GITHUB_CLIENT_ID",
		clientSecret: "GITHUB_CLIENT_SECRET",
	},
	googleOauth: {
		clientId: "GOOGLE_CLIENT_ID",
		clientSecret: "GOOGLE_CLIENT_SECRET",
	},

	firestore: "FIRESTORE_CONFIG",

	services: {
		dashApi: {
			baseUrl: "SERVICES_DASHAPI_BASEURL",
		},

		dashUi: {
			baseUrl: "SERVICES_DASHUI_BASEURL",
			routes: {
				authRedirection: "SERVICES_DASHUI_ROUTES_AUTH_REDIRECTION",
			},
		},
	},

	userToken: {
		cookieName: "COOKIE_NAME",
		ttl: {
			__name: "USER_TOKEN_TTL",
			__format: "number",
		},
		refreshTtl: {
			__name: "USER_TOKEN_REFRESH_TTL",
			__format: "number",
		},
		publicKey: "PUBLIC_KEY",
		privateKey: "PRIVATE_KEY",
	},
};
