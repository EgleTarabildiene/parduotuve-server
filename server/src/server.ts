import { app } from "./app.js";
import  dotenv  from "dotenv";
//Užkraunama .env biblioteka ir paimami kintamieji
dotenv.config();




console.log("Aplikacija paleista");

//Paleidžiame serverį ant PORTO kuris nurodytas process.env.PORT .env faile
app.listen(process.env.PORT, ()=>{
    console.log("Express serveris paleistas, ant uosto: "+process.env.PORT);
})