import mongoose from "mongoose"
// this is use to connect with the low level i.e noSql -> Mongodb
export const connectDatabase  = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"leave-management",
    }).then( ()=>{
        console.log("database connected")
    }).catch(e=>{
        console.log(e)
    });
}
