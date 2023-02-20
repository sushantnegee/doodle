const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    pic:{type:String,required:true, default:"https://t3.ftcdn.net/jpg/04/51/93/48/360_F_451934847_V7rc18Ibs9UNU5sSihQBY0MzSDgei4Cr.jpg"},
},{
    timestamps:true,
});

const User = mongoose = mongoose.model("User",userSchema);

module.exports = User;