const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const leadValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('status')
    .optional()
    .isIn(['New', 'Contacted', 'Qualified', 'Converted', 'Lost'])
    .withMessage('Invalid status'),
  body('notes').optional().trim(),
];

module.exports = { leadValidationRules, handleValidation };
