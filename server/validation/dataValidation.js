import { check } from 'express-validator';

export const dataValidation = [ 
  check(['author','title'])
    .exists()
    .withMessage('author or title key does not exists')
    .notEmpty()
    .withMessage('Cannot be empty')
    .isLength({ max: 20 })
    .withMessage('Max 20 characters')
    .matches(/^(?!.{20,})(?:\w+\W+){0,1}(?:\w+)$/)
    .withMessage('No white spaces and empty fields,max 20 characters'),
  check('tags')
    .exists()
    .withMessage('tag key does not exists')
    .notEmpty()
    .withMessage('Cannot be empty')
    .matches('^\s*([A-Za-z0-9]+(\s[A-Za-z0-9]+)*)(\s*,\s*([A-Za-z0-9]+(\s[A-Za-z0-9]+)*))*\s*$')
    .withMessage('Coma separated,no white spaces and empty fields'),
  check('message')
    .exists()
    .withMessage('message key does not exists')
    .notEmpty()
    .withMessage('Cannot be empty')
    .isLength({ min: 2 })
    .withMessage('Min 2 characters')
    .isLength({ max: 500 })
    .withMessage('Max 500 characters'),
  check(['selectedFile','selectedBackgroundFile'])
  .exists()
  .withMessage('selectedFile or selectedBackgroundFile key does not exists')
]