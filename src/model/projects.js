

const mongoose = require('mongoose')
const Schema = mongoose.Schema    //schema definition

const OfflineProjectSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "offlineuser_tb", required: true },
    project_id: { type: String, required: true },
    project_name: { type: String, required: true },

    project_type: { type: String },
    total_area: { type: String },
    budget: { type: Number },
    description: { type: String },
    location: { type:String},
    longitute: { type: String },
    latitude: { type: String },
    initiated_date: { type: String },
    due_date: { type: String }
}, {
    timestamps: true
})

var OfflineProjectdata = mongoose.model('offlineproject_tb', OfflineProjectSchema) //model creation
module.exports = OfflineProjectdata;
