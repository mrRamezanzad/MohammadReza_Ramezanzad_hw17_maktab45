const express = require('express'),
  router = express.Router(),
  path = require('path'),
  Company = require(path.join(__dirname, '../services/company')),
  Employee = require(path.join(__dirname, '../services/employee'))

// ====================== home page =========================
router.get('/', function (req, res) {
  res.render('index')
  // res.send("hello")
})

// ============================= company page =============================
router.get('/companies/', function (req, res) {
  // res.locals.message = "test message"
  let companies = Company.read({}, {
    _id: 0
  }, (err, companies) => {
    if (companies) {
      res.render('../views/company', {
        companies,
      })
      console.log(companies);
    } else {
      res.render('../views/company', {
        msg: "something went wrong"
      })
    }
  })
})

// ============================ employee page ============================ 
router.get('/employees/', function (req, res) {
  let companies = Company.read({}, {
    _id: 0
  }, (err, companies) => {
    if (companies) {
      res.render('../views/employee', {
        companies,
      })
      console.log(companies);
    } else {
      res.render('../views/employee', {
        msg: "something went wrong"
      })
    }
  })
})

// ========================= company's employees =====================
router.get('/companies/:id/employees/', (req, res) => {
  res.render('../views/company')
})

module.exports = router