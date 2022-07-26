const mongoose = require('mongoose')
const Schema = mongoose.Schema    //schema definition

const enquirySchema = new Schema({
    
  
    email: { type: String},
   name: { type: String },
    contact: { type: String },
    officeaddress: { type: String },
    message: { type:String},

}, {
    timestamps: true
})

var enquiryData = mongoose.model('enquirydetails_tb', enquirySchema) //model creation
module.exports = enquiryData;
