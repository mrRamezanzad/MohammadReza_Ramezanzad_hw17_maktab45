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
                    company_id: employee.company_id
                }).save((err, employee) => {
                    if (err) console.log(err.message)
                    callback(err, employee)
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
                company_id: employee.company_id
            }).save((err, employee) => {
                if (err) console.log(err.message)
                // console.log(employee);
                callback(err, employee)
            })
        }
    },
    read: (match, filter, callback) => {
        filter = {
            ...filter,
            // _id: 0,
            __v: 0
        }
        employeeModel.find(match).populate("company").select(filter).exec(function (err, employees) {
            if (err) console.log(err);
            callback(err, employees)
            // console.log("find my company heeeey");
        })

    },

    update: (match, updateInfo, callback) => {
        employeeModel.findOneAndUpdate(
            match, updateInfo, {
                new: true
            }, (err, employee) => {
                if (err) console.log(err);
                callback(err, employee)
            })
    },
    delete: (match, callback) => {
        employeeModel.deleteOne(match, (err, employee) => {
            if (err) console.log(err);
            callback(err, employee);
        })
    }
}