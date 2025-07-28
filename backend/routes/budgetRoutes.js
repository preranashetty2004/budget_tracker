const express = require('express');
const router = express.Router();
const {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget
} = require('../controllers/budgetController');

router.get('/', getBudgets);
router.post('/', addBudget);
router.put('/:id', updateBudget);   // ✅ must include id
router.delete('/:id', deleteBudget);

module.exports = router;
