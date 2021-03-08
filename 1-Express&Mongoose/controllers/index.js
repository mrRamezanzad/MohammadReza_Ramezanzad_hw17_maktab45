const express = require('express'),
  router = express.Router(),
  path = require('path')

/* GET home page. */
router.get('/', function (req, res) {

  let Company = require(path.join(__dirname, '../services/company'))

  let companies = Company.read({}, {
    _id: 0
  }, (companies) => {
    if (companies) {
      res.render('../views/index', {companies})
      console.log(companies);
    } else {
      res.render('../views/index', {
        msg: "something went wrong"
      })
    }
  })

})

/* GET cantact page. */
router.get('/contact', function (req, res) {
  res.render('../views/contact')
})

/* GET about page. */
router.get('/about', function (req, res) {
  res.render('../views/about')
})

module.exports = router