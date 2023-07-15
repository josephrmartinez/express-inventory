var express = require('express');
var router = express.Router();

router.get('/admin', function(req, res) {
  res.render('admin_view');
});

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
