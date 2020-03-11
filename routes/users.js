const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
//models
const User = require('../models/User');

/**
 * router.all()
 */

//index
router.get('/users', (req, res) => {
  User.find((error, users) => {
    if (error) console.log(errror);
    res.status(200).json(users);
  });
});

//show
router.get('/users/:id', (req, res) => {
  const {id} = req.params;
  User.findById(id, (error, user) => {
    if (error) console.log(error);
    res.status(200).json(user);
  });
});

//store
router.post('/users/', (req, res) => {
  res.send(`respond after saving user to databases`);
});

//update
router.put('/users/:id', (req, res) => {
  const {id} = req.params;
  res.send(`respond after updating user:id ${id}`);
});

//destroy
router.delete('/users/:id', (req, res) => {
  const {id} = req.params;
  res.send(`respond after deleting user:id ${id}`);
});

module.exports = router;
