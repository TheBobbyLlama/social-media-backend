const router = require('express').Router();
const {
	addUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	addFriend,
	removeFriend
} = require('../../controllers/user-controller');

//api/users
router.route('/')
	.get(getAllUsers)
	.post(addUser);

//api/users/:id
router.route('/:id')
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);

router.route('/:id/friends/:friendId')
	.post(addFriend)
	.delete(removeFriend);

module.exports = router;