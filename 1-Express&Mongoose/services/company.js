// ================ importing required models ================
let companyModel = require('../models/company')
let employeeModel = require('../models/employee')

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
                    callback(err, company);
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
                callback(err, company);
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
            callback(err, companies);
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
            callback(err, companies);
        })
    },

    // ================ update one company ================ 
    update: (match, updateInfo, callback) => {
        companyModel.findOneAndUpdate(
            match, updateInfo, {
                new: true
            }, (err, company) => {
                if (err) console.log(err);
                callback(err, company);
            })
    },

    // ================ update all companies ================ 
    updateAll: (match, updateInfo, callback) => {
        companyModel.updateMany(
            match, updateInfo, {
                new: true
            }, (err, companies) => {
                if (err) console.log(err);
                callback(err, companies);
            })
    },

    // ================ delete ================ 
    delete: (match, callback) => {
        companyModel.deleteOne(match, (err, company) => {
            if (err) console.log(err);
            callback(err, company);
        })
    }
}