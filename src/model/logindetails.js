const mongoose = require('mongoose')
const Schema = mongoose.Schema    //schema definition

const LogindetailsSchema = new Schema({
    user_id:{ type: Schema.Types.ObjectId, ref: "user_tb"},
    ip:{ type: String, required: true},
    device:{ type: String, required: true },
    currentstatus:{ type: String, required: true}
},{
    timestamps: true
})

var Logindetailsdata = mongoose.model('loginDetails_tb',LogindetailsSchema) //model creation
module.exports=Logindetailsdata;


