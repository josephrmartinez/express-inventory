var express = require('express');
const bcrypt = require('bcrypt')
var router = express.Router();

const correctPassword = 'mango'

const authenticate = (req, res, next) => {
  const password = req.body.password; // Assuming password is sent in the request body

  if (password == correctPassword){
  // HASH PASSWORD IN ORDER TO USE BCRYPT
  // bcrypt.compare(password, correctPassword, (err, result) => {
  //   console.log(password)
  //   console.log(correctPassword)
  //   if (err) {
  //     // Handle the error, e.g., return an error response
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }

    // if (result) {
      // Passwords match, allow access to the route
      next();
    } else {
      // Passwords don't match, return an unauthorized response
      res.redirect('/catalog')
    }
  }

router.post('/admin', authenticate, function(req, res) {
  res.render('admin_view');
});

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
