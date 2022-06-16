const mongoose = require('mongoose')
const Schema = mongoose.Schema    //schema definition

const OfflineUserSchema = new Schema({
    login_id: { type: Schema.Types.ObjectId, ref: "login_tb", required: true },
    uname: { type: String, required: true },
    email: { type: String, required: true },

    businessname: { type: String },
    contactperson: { type: String },
    contactphone: { type: Number },
    budget: { type: String },
    officeaddress: { type: String },
    location: { type:String},
    longitute: { type: String },
    latitude: { type: String },
    Refference: { type: String }
}, {
    timestamps: true
})

var OfflineUserdata = mongoose.model('offlineuser_tb', OfflineUserSchema) //model creation
module.exports = OfflineUserdata;
