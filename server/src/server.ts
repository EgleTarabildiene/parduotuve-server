
import {app} from "./app.js";
import dotenv from "dotenv";

dotenv.config();



console.log("Aplikacija paleista");


app.listen(process.env.PORT, ()=>{
    console.log("Express Serveris paleistas, ant uosto: "+process.env.PORT);
    
})
