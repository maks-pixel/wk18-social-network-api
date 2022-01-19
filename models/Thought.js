const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "gotta have a thought to post a thought",
        validate: [({length}) => 1<=length<=280 , 'your thought has to be between 1- 280 characters']
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    username:{
        type: String,
        required: true
    },
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