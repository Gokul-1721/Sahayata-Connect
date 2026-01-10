const mongoose=require("mongoose");
const as=mongoose.Schema(
    {
        name:String,
        email:String,
        password:String

    }
);
module.exports=mongoose.model("Admin",as);

