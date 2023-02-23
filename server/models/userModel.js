const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg"},
},{
    timestamps:true,
});

const User = mongoose.model("User",userSchema);

module.exports = User;