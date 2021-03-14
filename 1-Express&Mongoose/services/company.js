// ================ importing required models ================
let companyModel = require('../models/company')
let employeeModel = require('../models/employee')
const employee = require('./employee')

module.exports = {

    // ================ drop collection ================ 
    dropCollection: (model = companyModel) => {
        model.remove({}, (err, companies) => {
            if (err) console.log(err)
            return console.log(companies)
        })
    },

    // ================ create company ================ 
    create: (companyInfo, callback) => {
        if (Array.isArray(companyInfo)) {

            // ================ create multiple companies ================ 
            companyInfo.forEach(company => {
                new companyModel({
                    name: company.name,
                    cin: company.cin,
                    city: company.city,
                    province: company.province,
                    registerDate: company.registerDate,
                    telephone: company.telephone
                }).save((err, company) => {
                    if (err) console.log(err.message)
                    return callback(err, company);
                })
            })
        } else {

            // ================ create one company ================ 
            return new companyModel({
                name: companyInfo.name,
                cin: companyInfo.cin,
                city: companyInfo.city,
                province: companyInfo.province,
                registerDate: companyInfo.registerDate,
                telephone: companyInfo.telephone,
            }).save((err, company) => {
                if (err) console.log(err.message)
                return callback(err, company);
            })
        }
    },

    // ================ read multiple companies ================ 
    read: (match, filter, callback) => {
        filter = {
            ...filter,
            _id: 1,
            __v: 0
        }
        companyModel.find(match, filter, (err, companies) => {
            if (err) console.log(err);
            return callback(err, companies);
        })
    },

    // ================ read one company ================ 
    readOne: (match, filter, callback) => {
        filter = {
            ...filter,
            _id: 1,
            __v: 0
        }
        companyModel.findOne(match, filter, (err, companies) => {
            if (err) console.log(err);
            return callback(err, companies);
        })
    },

    // ================ read specefic company's employees ================ 
    readEmployees: (match, filter, callback) => {
        filter = {
            ...filter,
            _id: 1,
            __v: 0
        }
        companyModel.findOne(match, filter, (err, company) => {

            if (err) return console.log(err);

            if (company) {

                employeeModel.find({
                    company: company._id
                }).populate('company').exec((err, employees) => {
                    if (err) return callback(err, employees);
                    return callback(err, employees)
                })
            } else {
                return callback({
                    msg: "nothing found"
                }, [])
            }
        })
    },

    // ================ read specefic company's manager ================ 
    readManager: (match, filter, callback) => {
        filter = {
            ...filter,
            _id: 1,
            __v: 0
        }
        companyModel.findOne(match, filter, (err, company) => {

            console.log("im heree");
            if (err) return console.log(err);
            if(!company) return callback({msg: "nothing found"}, [])

            employeeModel.find({company: company._id, manager: true}).populate('company').exec((err, employees) => {
                    if (err) return callback(err, employees)
                    return callback(err, employees)
            })
        }) 
    },

    // ================ update one company ================ 
    update: (match, updateInfo, callback) => {
        companyModel.findOneAndUpdate(
            match, updateInfo, {
                new: true
            }, (err, company) => {
                if (err) console.log(err);
                return callback(err, company);
            })
    },

    // ================ update all companies ================ 
    updateAll: (match, updateInfo, callback) => {
        companyModel.updateMany(
            match, updateInfo, {
                new: true
            }, (err, companies) => {
                if (err) console.log(err);
                return callback(err, companies);
            })
    },

    // ================ delete ================ 
    delete: (match, callback) => {
        companyModel.deleteOne(match, (err, company) => {
            if (err) console.log(err);
            return callback(err, company);
        })
    }
}