const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts

router
.route('/')
.get(getAllThought);

router
.route('/:userId')
.post(addThought);

// /api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

module.exports = router;