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
      res.render('company', {
        companies,
      })
      // console.log(companies);
    } else {
      res.render('company', {
        msg: "something went wrong"
      })
    }
  })
})

// ============================ employee page ============================ 
router.get('/employees/', function (req, res) {

  let employees = Employee.read({}, {}, (err, employees) => {

    if (employees) {
      // console.log(employees);
      res.render('employee', {
        employees,
      })

    } else {
      res.render('employee', {
        msg: "something went wrong"
      })
    }
  })
})

// ========================= company's employees =====================
router.get('/companies/:id/employees/', (req, res) => {

  let employees = Employee.read({

    company: req.params.id
  }, {}, (err, employees) => {

    if (employees) {
      res.render('employee', {
        employees,
      })
      // console.log(employees);

    } else {
      res.render('employee', {
        msg: "something went wrong"
      })
    }
  })
})

module.exports = router