const mongoose=require("mongoose");
const es=mongoose.Schema(
    {
        eName:String,
        eDate:String,
        eImage:String,
        eVenue:String,
        eDetails:String

    }
);
module.exports=mongoose.model("Event",es);

