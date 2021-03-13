const mongoose = require('mongoose'),
    Company = require('./company')

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // minlength: 3,
        // maxlength: 25,
    },
    lastName: {
        type: String,
        // minlength: 3,
        // maxlength: 25,
        // required: true,
    },
    id: {
        type: String,
        // minlength: 10,
        // maxlength: 10,
        // required: true,
    },
    gender: {
        type: String,
        enum: ["female", "male"],
        // required: true,
    },
    manager: {
        type: Boolean,
        // required: true,
    },
    birthday: {
        type: Date,
        // required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },

})



// ============== check hooks for employee model ============== 
employeeSchema.pre('save', function (next) {

    // console.log("===================== im in pre save here =====================");
    // console.log(this);

    if (this.manager === true) {

        Employee.find({
            manager: true,
            company: this.company
        }, (err, manager) => {

            if (manager.length)
                return next(new Error("this company has a manager already"))

            return next()
        })
    } else {

        return next()
    }
})

employeeSchema.pre('updateOne', function (next) {

    // console.log("===================== im in pre update here =====================");
    // console.log("================= id =>>>>>>>", this)
    // console.log(this._update.manager === "true");

    if (this._update.manager === "true") {

        Employee.find({
            company: this._update.company,
            manager: true,
            _id: {
                $ne: this._conditions._id
            },
        }, (err, manager) => {
            
            if (manager.length)
                return next(new Error("this company already has a manager"))

            return next()
        })
    } else {

        return next()
    }
})


const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee