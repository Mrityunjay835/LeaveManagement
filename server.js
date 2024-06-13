import {app} from "./app.js"
import { connectDatabase } from "./data/database.js";

connectDatabase();

console.log(process.env.PORT)

app.listen(process.env.PORT,()=> {
    console.log("server is working");
});