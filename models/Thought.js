const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
});

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "gotta have a thought to post a thought",
        max: 280
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    username:{
        type: String,
        required: true
    },
    reactions:[ReactionSchema]
},
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
      });

      ThoughtSchema.virtual('reactionCount').get(function(){
        return this.reactions.length;
    });

const Thought =  model('Thought', ThoughtSchema);

module.exports = Thought;