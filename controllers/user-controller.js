const { User } = require('../models');

const userController = {
    //get all users
    getAllUser(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //get one user by id
    getUserById({ params }, res){
        User.findOne({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .cathc(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //create new user
    createUser({ body },res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>res.json(err));
    },

    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'no user with that ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No User with this id found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res){
        User.findOne({ _id: params.friendId }).then(({ _id })=>{
            return User.findOneAndUpdate({ _id: params.userId },
                { $push: { friends : _id } },
                { new: true })
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No User with this id found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriend({ params }, res){
        User.findOneAndUpdate({ _id: params.userId },
            { $pull: { friends : _id } },
            { new: true })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No User with this id found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;