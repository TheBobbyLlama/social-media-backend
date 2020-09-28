const { User, Thought } = require('../models');

const thoughtController = {
	addThought({ body }, res) {
		Thought.create(body)
		  .then(({ _id }) => {
			return User.findOneAndUpdate(
			  { username: body.username },
			  { $push: { thoughts: _id } },
			  { new: true }
			);
		  })
		  .then(dbUserData => {
			if (!dbUserData) {
			  res.status(404).json({ message: 'No user found with this id!' });
			  return;
			}
			res.json(dbUserData);
		  })
		  .catch(err => res.json(err));
	},
	getAllThoughts(req, res) {
		Thought.find({})
		.select('-__v')
		.sort({ createdAt: 1 })
		.then(dbThoughtData => res.json(dbThoughtData))
		.catch(err => {
			console.log(err);
			res.status(400).json(err);
		});
	},
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
		.select('-__v')
		.then(dbThoughtData => {
			if (!dbThoughtData) {
				res.status(404).json({ message: 'No thought found with this id!' });
				return;
			}

			res.json(dbThoughtData);
		})
		.catch(err => {
			console.log(err);
			res.status(400).json(err);
		});
	},
	updateThought({ body, params }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
		.then(dbThoughtData => {
			if (!dbThoughtData) {
				res.status(404).json({ message: 'No thought found with this id!' });
				return;
			}

			res.json(dbThoughtData);
		})
		.catch(err => res.status(400).json(err));
	},
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
		.then(dbThoughtData => {
			if (!dbThoughtData) {
				res.status(404).json({ message: 'No thought found with this id!' });
				return;
			}

			res.json(dbThoughtData);
		})
		.catch(err => res.status(400).json(err));
	},
	addReaction({ body, params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true, runValidators: true  }
		)
		.then(dbThoughtData => {
			if (!dbThoughtData) {
				res.status(404).json({ message: 'No thought found with this id!' });
				return;
			}

			res.json(dbThoughtData);
		})
		.catch(err => res.json(err));
	},
	deleteReaction({ params }, res) {
		console.log(params.reactionId);
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
		.then(dbThoughtData => res.json(dbThoughtData))
		.catch(err => res.json(err));
	}
};

module.exports = thoughtController;