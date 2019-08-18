let express = require('express');
let router = express.Router();
let Product = require('../models/product');
let csrf = require('csurf');

let csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function (req, res, next) {
  let products = Product.find(function (err, docs) {
    res.render('shop/index', { title: 'Express', products: docs });
  });
});

router.get('/user/signup', function (req, res, next) {
  res.render('user/signup', {csrfToken: req.csrfToken()})
})
module.exports = router;
