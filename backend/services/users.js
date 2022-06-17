const express = require('express');
const router = express.Router();
var UserService = require("./users.service");
/*
 * Get all users
*/
router.get('/', (req, res, next) => {
  const users = UserService.read(req.body);
  res.status(201).json(
    { users: users }
  );
});
/*
 * Get user by id
*/
router.get('/:id', (req, res, next) => {
  const user = UserService.retrieve(req.params.id);
  res.status(201).json(
    user
  );
});
/*
 * Create new User
*/
router.post('/', async (req, res, next) => {

  const users = UserService.create(req.body);
  res.status(201).json(
    { users: users }
  );
});
/*
 * Update user
*/
router.put('/:id', async (req, res, next) => {
  const users = UserService.update(req.params.id, req.body);
  res.status(201).json(
    { users: users }
  );
});
/*
 * Delete user
*/
router.delete('/:id', async (req, res, next) => {
  const users = UserService.delete(req.params.id);
  res.status(201).json(
    { users: users }
  );
});

module.exports = router;
