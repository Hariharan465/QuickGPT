import mongoose from "mongoose";

const transavtionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    planId : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    credits : {
        type : Number,
        required : true
    },
    isPaid : {
        type : Boolean,
        default : false
    },
} , {timestamps : true})


const Transaction = mongoose.model('Transaction' , transavtionSchema)
export default Transaction