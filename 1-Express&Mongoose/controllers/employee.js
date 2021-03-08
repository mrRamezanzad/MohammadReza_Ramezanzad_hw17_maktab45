const express = require('express'),
    router = express.Router()

// adding employee services
const Employee = require('../services/employee')

// ============== crud services routes
// Employee.dropCollection()

// Employee.create([{
//     firstName: "ali",
//     lastName: "abbsi",
//     id: "1",
//     gender: "male",
//     manager: false,
//     birthday: new Date("2010").toDateString(),
//     company: "6040e076052a92381484eac2"
// }, {
//     firstName: "mitra",
//     lastName: "vahidee",
//     id: "2",
//     gender: "female",
//     manager: true,
//     birthday: new Date("1995").toDateString(),
//     company: "6040e070052a92381484eac1"
// }, {
//     firstName: "masood",
//     lastName: "rajabi",
//     id: "3",
//     gender: "male",
//     manager: false,
//     birthday: new Date("1980").toDateString(),
//     company: "6040e070052a92381484eac1"
// }, ], (employees) => {
//     console.log(employees);
// })

// Employee.update({
//     _id: "603e930785955a0a1cb0c8cb"
// }, {
//     lastName: "javeed"
// }), (employee) => {
// console.log(employee);
// })
// Employee.delete({
//     _id: "603e930785955a0a1cb0c8cb"
// }, (employee) => {
// console.log(employee);
// }))
// Employee.read({
//     _id: "603e9cdaecf5174278badbe7"
// }, (e) => {
//     console.log(e);
// }, (employee) => {
// console.log(employee);
// }))

// ================= crud routes =================

// ================= create 
router.post("/employee/create", (req, res) => {
    let newEmployeeInfo = {
        ...(req.body.firstName) && {
            firstName: req.body.firstName
        },
        ...(req.body.lastName) && {
            lastName: req.body.lastName
        },
        ...(req.body.id) && {
            id: req.body.id
        },
        ...(req.body.gender) && {
            gender: req.body.gender
        },
        ...(req.body.manager) && {
            manager: req.body.manager
        },
        ...(req.body.birthday) && {
            birthday: new Date(req.body.birthday)
        },
        ...(req.body.company) && {
            company: req.body.company
        }
    }

    // ========== getting informations functionally ============
    // function getInformations(data) {
    //     let employeeProperties = ["firstName", "lastName", "id", "gender", "manager"]
    //     let fullData = {}
    //     employeeProperties.forEach((property, index) => {

    //             ...(data[property]) && {fulldata[property] : data[property]}

    //     })
    //     console.log(fullData);
    // }
    // getInformations()

    Employee.create([newEmployeeInfo], (employee) => {
        if (employee) {
            res.status(201).json(employee)
        } else {
            res.json({
                msg: "something went wrong"
            })
        }
    })
})

// ================= read

router.get("/employee/getAll", (req, res) => {
    let currentYear = new Date().getFullYear(),
        match = {
            ...(req.query.minAge && !req.query.maxAge) && {
                birthday: {
                    $lte: new Date(`${currentYear - req.query.minAge}`)
                }
            },
            ...(req.query.maxAge && !req.query.minAge) && {
                birthday: {
                    $gte: new Date(`${currentYear - req.query.maxAge}`)
                }
            },
            ...(req.query.minAge && req.query.maxAge) && {
                birthday: {
                    $lte: new Date(`${currentYear - req.query.minAge}`),
                    $gte: new Date(`${currentYear - req.query.maxAge}`)
                }
            },
            ...(req.query.manager) && {
                manager: req.query.manager
            },
            // ...(req.query.company) && {
            //     company.name: {$eq: {name: req.query.company}}
            // }
        },
        exc = req.query.exc && req.query.exc.split(","),
        exclude = exc && {
            ...(exc.includes("firstName") && {
                firstName: 0
            }),
            ...(exc.includes("lastName")) && {
                lastName: 0
            },
            ...(exc.includes("id")) && {
                id: 0
            },
            ...(exc.includes("gender")) && {
                gender: 0
            },
            ...(exc.includes("manager")) && {
                manager: 0
            },
            ...(exc.includes("birthday")) && {
                birthday: 0
            }
        }

    // console.log(match);
    // console.log(exclude.filter(el => el.trim()));
    // console.log(currentYear);

    Employee.read(match, exclude, (employees) => {
        if (employees) {
            res.json(employees)
        } else {
            res.json({
                msg: "something went wrong"
            })
        }
    })
})

router.get("/employee/get", (req, res) => {
    let exclude = {}

    Employee.read({
        _id: req.query.id
    }, exclude, (employee) => {
        if (employee) {
            res.json(employee)
        } else {
            res.json({
                msg: "something went wrong"
            })
        }
    })
})

// ================= update 
router.put("/employee/update", (req, res) => {

    let employeeUpdateInfo = {
        ...(req.body.firstName) && {
            firstName: req.body.firstName
        },
        ...(req.body.lastName) && {
            lastName: req.body.lastName
        },
        ...(req.body.id) && {
            id: req.body.id
        },
        ...(req.body.gender) && {
            gender: req.body.gender
        },
        ...(req.body.manager) && {
            manager: req.body.manager
        },
        ...(req.body.birthday) && {
            birthday: req.body.birthday
        },
        ...(req.body.company) && {
            birthday: req.body.company
        }
    }

    Employee.update({
        _id: req.query.id
    }, employeeUpdateInfo, (employee) => {
        if (employee) {
            res.json(employee);
        } else {
            res.json({
                msg: "something went wrong"
            })
        }
    })
})

// =================== delete
router.delete("/employee/delete", (req, res) => {

    console.log(req.query.id);
    Employee.delete({
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