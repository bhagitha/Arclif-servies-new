const mongoose = require('mongoose')
const Schema = mongoose.Schema    //schema definition

const stagesSchema = new Schema({
    plan_id:{type: Schema.Types.ObjectId, ref: "paymentplan_tb", required: true },
    stage:{type:String},
    services:{type:Array},
    rate:{type:Number},
    stage_Description:{type:String},
})

var StagesSchemaData = mongoose.model('stages_tb', stagesSchema) //model creation
module.exports = StagesSchemaData;
