
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const veteranSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    fatherName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    hobbies:{
        type:Object,
        default:[]
    },
    rank:{
        type:String,
        required:true
    },
    interestedIn:{
        type:Object,
        default:[]
    },
    star:{
        type:Number,
        default:0
    },
    followed:{
        type:Number,
        default:0
    },
    followedList:{
        type:Object,
        default:[]
    },
    community:{
        type:Object,
        default:[]
    }
},{timestamps:true})

const Veteran = mongoose.model("Veteran", veteranSchema);

module.exports= Veteran;