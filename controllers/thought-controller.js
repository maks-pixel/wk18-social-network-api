const { Thought, User } = require('../models');

const thoughtController = {
    //GET to get all thoughts
    getAllThought(req, res){
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //GET to get a single thought by its _id
    getThoughtById({ params }, res){
        Thought.findOne({ _id:params.thoughtId })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //POST to create a new thought
    addThought({params, body}, res){
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id} },
                { new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res){
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'no Thought with that ID'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id:params.thoughtId })
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({ message: "no thought with this id! "});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
    }
};

module.exports = thoughtController;