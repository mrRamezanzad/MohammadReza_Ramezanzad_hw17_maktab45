const express = require('express'),
  router = express.Router()

// adding company services
const Company = require('../services/company')

// crud services routes
// Company.dropCollection()

// Company.create([{
//   name: "rastad",
//   cin: "1",
//   city: "tehran",
//   province: "eslamshar",
//   registerDate: new Date("2010"),
//   telephone: "09191234533",
// }, {
//   name: "afra",
//   cin: "2",
//   city: "rasht",
//   province: "eslamshar",
//   registerDate: new Date("2019"),
//   telephone: "09191234533",
// }, {
//   name: "Montego",
//   cin: "3",
//   city: "isfahan",
//   province: "eslamshar",
//   registerDate: new Date("2021"),
//   telephone: "09191234533",
// }, ], (companies) => {
//   console.log(companies);
// })


// Company.update({_id: "603e882fb0e0560348a1c8bb"},{name: "javeed"})
// Company.delete({_id: "603e882fb0e0560348a1c8bb"})
// Company.read()


// ================= crud routes =================

// ================= create 
router.post("/company/create", (req, res) => {
  console.log(req.body)
  let newCompanyInfo = {
    ...(req.body.name) && {
      name: req.body.name
    },
    ...(req.body.cin) && {
      cin: req.body.cin
    },
    ...(req.body.city) && {
      city: req.body.city
    },
    ...(req.body.province) && {
      province: req.body.province
    },
    ...(req.body.registerDate) && {
      registerDate: new Date(req.body.registerDate)
    },
    ...(req.body.telephone) && {
      telephone: req.body.telephone
    }
  }

  Company.create([newCompanyInfo], (company) => {
    if (company) {
      res.status(201).json(company)
    } else {
      res.json({
        msg: "something went wrong"
      })
    }
  })
})

// ================= read
router.get("/company/getAll", (req, res) => {
  let exclude = req.query.exc && {

  }

  Company.read({}, exclude, (companies) => {
    if (companies) {
      res.json(companies)
    } else {
      res.json({
        msg: "something went wrong"
      })
    }
  })
})

// ================= get queries
router.get("/company/get/q=", (req, res) => {

  let selectedRegister = new Date()
  selectedRegister.setFullYear(selectedRegister.getFullYear() - req.query.lt)
  let match = {
      ...(req.query.lt) && {
        registerDate: {
          $gte: selectedRegister
        },
      },
      ...(req.query.id) && {
        _id: req.query.id
      }
    },
    exclude = req.query.exc && {}
  // console.log(match);

  Company.read(match, exclude, (company) => {
    if (company) {
      res.json(company)
      // console.log(company);
    } else {
      res.json({
        msg: "nothing found"
      })
    }
  })
});

// ================= update 
router.put("/company/update", (req, res) => {

  let companyUpdateInfo = {
    ...(req.body.name) && {
      name: req.body.name
    },
    ...(req.body.cin) && {
      cin: req.body.cin
    },
    ...(req.body.city) && {
      city: req.body.city
    },
    ...(req.body.province) && {
      province: req.body.province
    },
    ...(req.body.registerDate) && {
      registerDate: new Date(req.body.registerDate)
    },
    ...(req.body.telephone) && {
      telephone: req.body.telephone
    }
  }
  if (req.query.all === "true") {

    Company.updateAll({}, companyUpdateInfo, (companies) => {
      if (companies) {
        res.json(companies);
      } else {
        res.json({
          msg: "something went wrong"
        })
      }
    })
  } else {

    Company.update({
      _id: req.query.id
    }, companyUpdateInfo, (company) => {
      if (company) {
        res.json(company);
      } else {
        res.json({
          msg: "something went wrong"
        })
      }
    })
  }
})

// =================== delete
router.delete("/company/delete", (req, res) => {

  Company.delete({
    _id: req.query.id
  }, (response) => {
    if (response) {
      res.json(response)
    } else {
      res.json({
        msg: "something went wrong"
      })
    }
  })
})


module.exports = router