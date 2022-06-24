
const mongoose = require('mongoose')
const Schema = mongoose.Schema    //schema definition

const ProjectPaymentsSchema = new Schema({
    project_id: { type: Schema.Types.ObjectId, ref: "login_tb", required: true },
    architect_fee: { type: String, required: true },
    advance: { type: String, required: true },
    
}, {
    timestamps: true
})

var ProjectPaymentsdata = mongoose.model('offlineproject_tb', ProjectPaymentsSchema) //model creation
module.exports = ProjectPaymentsdata;