let employeeModel = require('../models/employee')

module.exports = {
    dropCollection: (model = employeeModel) => {
        model.remove({}, (err, employees) => {
            if (err) console.log(err)
            return console.log(employees)

        })
    },
    create: (employeeInfo, callback) => {

        if (Array.isArray(employeeInfo)) {
            employeeInfo.forEach(employee => {
                new employeeModel({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    id: employee.id,
                    gender: employee.gender,
                    manager: employee.manager,
                    birthday: employee.birthday,
                    company: employee.company
                }).save((err, employee) => {
                    if (err) console.log(err.message)
                    callback(employee)
                })
            })
        } else {
            new employeeModel({
                firstName: employee.firstName,
                lastName: employee.lastName,
                id: employee.id,
                gender: employee.gender,
                manager: employee.manager,
                birthday: employee.birthday,
                company: employee.company
            }).save((err, employee) => {
                if (err) console.log(err.message)
                // console.log(employee);
                callback(employee)
            })
        }
    },
    read: (match, exclude, callback) => {
        exclude = {
            ...exclude,
            // _id: 0,
            __v: 0
        }
        employeeModel.find(match).populate("company").select(exclude).exec(function (err, employees) {
            if (err) console.log(err);
            callback(employees)
            console.log("find my company heeeey");
        })

    },

    update: (match, updateInfo, callback) => {
        employeeModel.findOneAndUpdate(
            match, updateInfo, {
                new: true
            }, (err, employee) => {
                if (err) console.log(err);
                callback(employee)
            })
    },
    delete: (match, callback) => {
        employeeModel.deleteOne(match, (err, employee) => {
            if (err) console.log(err);
            callback(employee);
        })
    }
}