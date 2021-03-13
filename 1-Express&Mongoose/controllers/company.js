const express = require('express'),
  router = express.Router(),

  // importing company services
  Company = require('../services/company')

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
// }, {
//   name: "samen",
//   cin: "4",
//   city: "yazd",
//   province: "eslamshar",
//   registerDate: new Date("2021"),
//   telephone: "09191234533",
// },, {
//   name: "Day",
//   cin: "5",
//   city: "mashhad",
//   province: "eslamshar",
//   registerDate: new Date("2021"),
//   telephone: "09191234533",
// },, {
//   name: "golrang",
//   cin: "6",
//   city: "tehran",
//   province: "eslamshar",
//   registerDate: new Date("2021"),
//   telephone: "09191234533",
// }, ], (err, companies) => {
// })


// Company.update({_id: "603e882fb0e0560348a1c8bb"},{name: "javeed"}, (err, company) => {
// })
// Company.delete({_id: "603e882fb0e0560348a1c8bb"}, (err, company) => {
// })
// Company.read({}, {}, (err, company) => {
// })


// ******************** crud routes ********************

// ================= create =================
router.post("/api/companies/", (req, res) => {

  // ----------- filtering required informations to make new 
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

  // -------- invoking service to create new
  Company.create([newCompanyInfo], (err, company) => {
    if (err) {
      res.status(400).json({
        msg: "something went wrong"
      })
    } else {
      res.status(201).json(company)
    }
  })
})

// ================= read =================
router.get("/api/companies/", (req, res) => {

  // check for specific dates 
  let selectedRegister = new Date()
  selectedRegister.setFullYear(selectedRegister.getFullYear() - req.query.lt)

  // make safe matches for search
  let match = {
      ...(req.params.id) && {
        _id: req.params.id
      },
      ...(req.query.lt) && {
        registerDate: {
          $gte: selectedRegister
        },
      },
    },

    // check field filters
    filter = req.query.exc && {}

  // invokeing search by parameters service
  Company.read(match, filter, (err, companies) => {
    if (err) {
      res.status(400).json({
        msg: "something went wrong"
      })
    } else {
      res.json(companies)
    }
  })
})

// ============ specific queries ============
router.get("/api/companies/:id/", (req, res) => {

  // check for specific dates 
  let selectedRegister = new Date()
  selectedRegister.setFullYear(selectedRegister.getFullYear() - req.query.lt)

  // make safe matches for search
  let match = {
      ...(req.params.id) && {
        _id: req.params.id
      },
      ...(req.query.lt) && {
        registerDate: {
          $gte: selectedRegister
        }
      },
    },

    // check field filters
    filter = req.query.exc && {}

  // invoke finding one item service
  Company.readOne(match, filter, (err, company) => {
    if (err) {
      res.status(400).json({
        msg: "nothing found"
      })
    } else {
      res.json(company)
    }
  })
});

// ================= update =================
router.put("/api/companies/:id", (req, res) => {

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

    Company.updateAll({}, companyUpdateInfo, (err, companies) => {
      if (err) {
        res.status(400).json({
          msg: "something went wrong"
        })
      } else {
        res.json(companies);
      }
    })
  } else {

    Company.update({
      _id: req.params.id
    }, companyUpdateInfo, (err, company) => {
      if (err) {
        res.status(400).json({
          msg: "something went wrong"
        })
      } else {
        res.json(company);
      }
    })
  }
})

// =================== delete ===================
router.delete("/api/companies/:id", (req, res) => {

  Company.delete({
    _id: req.params.id
  }, (err, response) => {
    if (err) {
      res.status(400).json({
        msg: "something went wrong"
      })
    } else {
      res.json(response)
    }
  })
})


module.exports = router