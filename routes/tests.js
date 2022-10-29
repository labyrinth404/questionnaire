const router = require('express').Router();
const {
  getAllTest,
  getTest,
  addTest,
  editTest,
  deleteTest
} = require('../controllers/tests');

router.get('/', getAllTest);
router.get('/:id', getTest);
router.post('/:id', addTest);
router.put('/:id', editTest);
router.delete('/:id', deleteTest);

module.exports = router;