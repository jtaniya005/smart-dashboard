const express = require('express');
const router = express.Router();
const {
  createLead,
  getAllLeads,
  getLead,
  updateLead,
  deleteLead,
  getStats,
} = require('../controllers/leadcontroller');
const { leadValidationRules, handleValidation } = require('../middleware/validate');

// Stats route (must be before /:id)
router.get('/stats', getStats);

// CRUD routes
router.route('/')
  .get(getAllLeads)
  .post(leadValidationRules, handleValidation, createLead);

router.route('/:id')
  .get(getLead)
  .put(updateLead)
  .delete(deleteLead);

module.exports = router;
