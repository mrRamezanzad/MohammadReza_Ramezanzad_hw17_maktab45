const express = require('express'),
  router = express.Router(),
  path = require('path'),
  Company = require(path.join(__dirname, '../services/company')),
  Employee = require(path.join(__dirname, '../services/employee'))

/* GET home page. */
router.get('/', function (req, res) {


  let companies = Company.read({}, {
    _id: 0
  }, (err, companies) => {
    if (companies) {
      res.render('../views/index', {
        companies,
        page: "home"
      })
      console.log(companies);
    } else {
      res.render('../views/index', {
        msg: "something went wrong"
      })
    }
  })

})

/* GET cantact page. */
router.get('/company', function (req, res) {
  let companies = Company.read({}, {
    _id: 0
  }, (err, companies) => {
    if (companies) {
      res.render('../views/company', {
        companies,
        page: "company"
      })
      console.log(companies);
    } else {
      res.render('../views/company', {
        msg: "something went wrong"
      })
    }
  })
})

/* GET about page. */
router.get('/employee', function (req, res) {
  let companies = Company.read({}, {
    _id: 0
  }, (err, companies) => {
    if (companies) {
      res.render('../views/employee', {
        companies,
        page: "employee"
      })
      console.log(companies);
    } else {
      res.render('../views/employee', {
        msg: "something went wrong"
      })
    }
  })
})

module.exports = router