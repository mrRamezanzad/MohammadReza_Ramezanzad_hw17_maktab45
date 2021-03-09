const express = require('express'),
    router = express.Router()

// adding employee services
const Employee = require('../services/employee')
const Company = require('../services/company')

// ============== crud services routes
// Employee.dropCollection()

// Employee.create([{
//     firstName: "sami",
//     lastName: "beigi",
//     id: "1",
//     gender: "male",
//     manager: false,
//     birthday: new Date("2010").toDateString(),
//     company: "6047319e41cf7f2bb42b2790"
// }, {
//     firstName: "mitra",
//     lastName: "vahidee",
//     id: "2",
//     gender: "female",
//     manager: true,
//     birthday: new Date("1995").toDateString(),
//     company: "6047319e41cf7f2bb42b2790"
// }, {
//     firstName: "masood",
//     lastName: "rajabi",
//     id: "3",
//     gender: "male",
//     manager: false,
//     birthday: new Date("1980").toDateString(),
//     company: "6047319e41cf7f2bb42b2793"
// },{
//     firstName: "javad",
//     lastName: "sameni",
//     id: "4",
//     gender: "male",
//     manager: false,
//     birthday: new Date("1980").toDateString(),
//     company: "6047319e41cf7f2bb42b2791"
// },{
//     firstName: "zahra",
//     lastName: "momeni",
//     id: "5",
//     gender: "male",
//     manager: true,
//     birthday: new Date("1980").toDateString(),
//     company: "6047319e41cf7f2bb42b2791"
// },{
//     firstName: "saeed",
//     lastName: "bahmani",
//     id: "6",
//     gender: "male",
//     manager: false,
//     birthday: new Date("1980").toDateString(),
//     company: "6047319e41cf7f2bb42b278f"
// }, ], (err, employees) => {
//     console.log(employees);
// })

// Employee.update({
//     _id: "603e930785955a0a1cb0c8cb"
// }, {
//     lastName: "javeed"
// }), (err, employee) => {
// console.log(employee);
// })
// Employee.delete({
//     _id: "603e930785955a0a1cb0c8cb"
// }, (err, employee) => {
// console.log(employee);
// }))
// Employee.read({
//     _id: "603e9cdaecf5174278badbe7"
// }, (err, employee) => {
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

    Employee.create([newEmployeeInfo], (err, employee) => {
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
            }
        },
        exc = req.query.exc && req.query.exc.split(","),
        filter = exc && {
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

    if (req.query.company) {
        Company.read({
            name: `${req.query.company}`
        }, {}, (err, targetCompany) => {

            if (err) {

                return res.json({
                    msg: "something went wrong in getting a companies employees"
                })
            }
            if (targetCompany.length) {

                Employee.read({
                    company: targetCompany[0]._id
                }, filter, (err, employees) => {
                    if (err) {
                        console.log(err);
                        return res.json({
                            msg: "something went wrong "
                        })
                    }
                    console.log(employees);
                    return res.json(employees)
                })
            } else {
                return res.json({
                    msg: "found nothing"
                })
            }
        })
    }
    // console.log(match);
    // console.log(filter.filter(el => el.trim()));
    // console.log(currentYear);
    else {
        Employee.read(match, filter, (err, employees) => {
            console.log("employeeeee", employees);
            if (employees) {
                res.json(employees)
            } else {
                res.json({
                    msg: "something went wrong in getting all employees"
                })
            }
        })
    }
})

router.get("/employee/get", (req, res) => {
    let currentYear = new Date().getFullYear(),
        match = {
            ...(req.query.id) && {
                _id: req.query.id
            },
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
            }
        },
        exc = req.query.exc && req.query.exc.split(","),
        filter = exc && {
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

    if (req.query.company) {
        Company.read({
            name: req.query.company
        }, {}, (err, company) => {
            match = {
                ...match,
                company: company[0]._id
            }
            Employee.read(match, filter, (err, employee) => {
                if (employee) {
                    res.json(employee)
                } else {
                    res.json({
                        msg: "something went wrong"
                    })
                }
            })
        })
    } else {
        Employee.read(match, filter, (err, employee) => {
            if (employee) {
                res.json(employee)
            } else {
                res.json({
                    msg: "something went wrong"
                })
            }
        })
    }
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
    }, employeeUpdateInfo, (err, employee) => {
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
    Employee.delete({
        _id: req.query.id
    }, (err, response) => {
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