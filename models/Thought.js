const moment = require('moment');
const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
	{
		reactionId: {
			type: Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody: {
			type: String,
			required: true,
			trim: true,
			pattern: /^.{2,280}$/
		},
		username: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
		},
	},
	{
		toJSON: {
			getters: true
		}
	}
);

const ThoughtSchema = new Schema({
		thoughtText: {
			type: String,
			required: true,
			trim: true,
			pattern: /^.{2,280}$/
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
		},
		username: {
			type: String,
			required: true
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
		virtuals: true,
		getters: true
	},
	id: false
});

ThoughtSchema.virtual('reactionCount').get(function() {
	return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;