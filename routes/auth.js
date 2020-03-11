const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');


//login
router.post('/login', passport.authenticate('jwt'),(req, res) => {

    const {user} = req;
    const token = bcrypt.hashSync(user.password, 8);
    const response = {user, token};
    res.status(200).json(response);

});

module.exports = router;