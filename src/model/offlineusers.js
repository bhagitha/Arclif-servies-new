const mongoose = require('mongoose')
const Schema = mongoose.Schema    //schema definition

const OfflineUserSchema = new Schema({
    // login_id: { type: Schema.Types.ObjectId, ref: "login_tb", required: true },
    customer_name: { type: String },
    email: { type: String},
    business_name: { type: String },
    contact_person: { type: String },
    contact_phone: { type: String },
    officeaddress: { type: String },
    location: { type:String},
    // longitude: { type: String },
    // latitude: { type: String },
    Reference: { type: String }
}, {
    timestamps: true
})

var OfflineUserdata = mongoose.model('offlineuser_tb', OfflineUserSchema) //model creation
module.exports = OfflineUserdata;
