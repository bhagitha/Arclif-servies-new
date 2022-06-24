const mongoose = require('mongoose')
const Schema = mongoose.Schema    //schema definition

const OfflineUserSchema = new Schema({
    // login_id: { type: Schema.Types.ObjectId, ref: "login_tb", required: true },
    customer_name: { type: String, required: true },
    email: { type: String, required: true },

    business_name: { type: String },
    contact_person: { type: String },
    contact_phone: { type: Number },
    officeaddress: { type: String },
    location: { type:String},
    longitute: { type: String },
    latitude: { type: String },
    Reference: { type: String }
}, {
    timestamps: true
})

var OfflineUserdata = mongoose.model('offlineuser_tb', OfflineUserSchema) //model creation
module.exports = OfflineUserdata;
