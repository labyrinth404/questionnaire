const router = require('express').Router();
const {
  getAllQustion,
  getQustion,
  addQustion,
  editQustion,
  deleteQustion
} = require('../controllers/qustions');

router.get('/', getAllQustion);
router.get('/:id', getQustion);
router.post('/:id', addQustion);
router.put('/:id', editQustion);
router.delete('/:id', deleteQustion);

module.exports = router;