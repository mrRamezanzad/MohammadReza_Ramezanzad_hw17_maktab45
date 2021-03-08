let companyModel = require('../models/company')

module.exports = {
    dropCollection: (model = companyModel) => {
        model.remove({}, (err, companies) => {
            if (err) console.log(err)
            return console.log(companies)
        })
    },
    create: (companyInfo, callback) => {
        if (Array.isArray(companyInfo)) {

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
                    callback(company);
                })
            })
        } else {
            return new companyModel({
                name: companyInfo.name,
                cin: companyInfo.cin,
                city: companyInfo.city,
                province: companyInfo.province,
                registerDate: companyInfo.registerDate,
                telephone: companyInfo.telephone,
            }).save((err, company) => {
                if (err) console.log(err.message)
                callback(company);
            })
        }
    },
    read: (match, exclude, callback) => {
        exclude = {
            ...exclude,
            _id: 1,
            __v: 0
        }
        companyModel.find(match, exclude, (err, companies) => {
            if (err) console.log(err);
            callback(companies);
        })
    },
    update: (match, updateInfo, callback) => {
        companyModel.findOneAndUpdate(
            match, updateInfo, {
                new: true
            }, (err, company) => {
                if (err) console.log(err);
                callback(company);
            })
    },
    updateAll: (match, updateInfo, callback) => {
        companyModel.updateMany(
            match, updateInfo, {
                new: true
            }, (err, companies) => {
                if (err) console.log(err);
                callback(companies);
            })
    },
    delete: (match, callback) => {
        companyModel.deleteOne(match, (err, company) => {
            if (err) console.log(err);
            callback(company);
        })
    }
}