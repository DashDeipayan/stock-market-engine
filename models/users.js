const firebase = require("../db");
const fireStore = firebase.firestore();
const userModel = fireStore.collection("users");

const addOrUpdate = async (userData, userId = null) => {
	try {
		// userId exists Update user
		if (userId !== null) {
			const user = await userModel.doc(userId).get();
			const isNewUser = !user.data();
			// user exists update user
			if (user.data()) {
				await userModel.doc(userId).set({
					...user.data(),
					...userData,
				});
			}

			return { isNewUser, userId };
		}

		// userId is null, Add or Update user
		const user = await userModel
			.where("github_id", "==", userData.github_id)
			.limit(1)
			.get();
		if (!user.empty) {
			await userModel.doc(user.docs[0].id).set(userData, { merge: true });

			return { isNewUser: false, userId: user.docs[0].id };
		}

		// Add new user
		/*
       Adding default archived role enables us to query for only
       the unarchived users in the /members endpoint
       For more info : https://github.com/Real-Dev-Squad/website-backend/issues/651
     */
		userData.roles = { archived: false };
		userData.incompleteUserDetails = true;
		const userInfo = await userModel.add(userData);
		return { isNewUser: true, userId: userInfo.id };
	} catch (err) {
		logger.error("Error in adding or updating user", err);
		throw err;
	}
};

module.exports = {
	addOrUpdate,
};
