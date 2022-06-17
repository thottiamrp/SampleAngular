const express = require('express');
const router = express.Router();
var ClaimsService = require("./claims.service");
/*
 * Get all users
*/
router.get('/', (req, res, next) => {
  const claims = ClaimsService.read(req.body);
  res.status(201).json(
    { claims: claims }
  );
});
/*
 * Get user by id
*/
router.get('/:id', (req, res, next) => {
  const claims = ClaimsService.retrieve(req.params.id);
  res.status(201).json(
    claims
  );
});
/*
 * Create new User
*/
router.post('/', async (req, res, next) => {
  console.log('Ceate a new user',req.body)
  const claims = ClaimsService.create(req.body);
  res.status(201).json(
    { claims: claims }
  );
});
/*
 * Update user
*/
router.put('/:id', async (req, res, next) => {
  const claims = ClaimsService.update(req.params.id, req.body);
  res.status(201).json(
    { claims: claims }
  );
});
/*
 * Delete user
*/
router.delete('/:id', async (req, res, next) => {
  const claims = ClaimsService.delete(req.params.id);
  res.status(201).json(
    { claims: claims }
  );
});

module.exports = router;
