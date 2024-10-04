const mongoose = require("mongoose"); 
const Schema = mongoose.Schema
const SubServiceSchema = new  Schema(
    {
        subServiceName:{
            type : String,
            required : true,
            trim : true,
        },
        description:{
            type : String,
            required : true,
            trim : true,
        },
        subSubServices:{
            type : Array,
            required : true,
            trim : true,
        },
        createdAt:{
            type : Date,
            default : Date.now,
        },
        updatedAt:{
            type : Date,
            default : Date.now,
        }
    },
    {
        timeStamps : true,
    }
)
module.exports = mongoose.model('SubService',SubServiceSchema)