import { pool } from "../db/connect";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";

export class AuthController{
    
    
    static async signin(req:any, res:any){
        const name=req.body.name; 
        const email=req.body.email;
        let password:string=req.body.password;

        password=await bcrypt.hash(password, 12);

        let sql="SELECT * FROM users WHERE email LIKE ?";
        const [result]=await pool.query<User[]>(sql,[email]);
        if  (result.length!=0){
            return res.status(400).json({
                'text':"Vartotojas su tokiu el. pašto adresu yra registruotas"
            })
        }

        sql="INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        await pool.query(sql, [name, email, password]);

        res.json({"status":"ok"});
    }

    static async login(req:any, res:any){
        const email=req.body.email;
        const password=req.body.password;

        const sql="SELECT * FROM users WHERE email LIKE ?"; 
        const [result]=await pool.query<User[]>(sql, [email]);
        if (result.length!=1){
            return res.status(400).json({
                'text':'Vartotojas su tokiu el. pašto adresu neegzistuoja'
            })
        }
        const user=result[0];
        let passwordOk=await bcrypt.compare(password, user.password);
        if (!passwordOk){
            return res.status(400).json({
                'text':'Įvestas neteisingas slaptažodis arba el. pašto adresas'
            });
        }
        if (process.env.TOKEN_SECRET!=null){
            dotenv.config();
            let token=jwt.sign(
                {
                    id:user.id,
                    type:user.type
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn:'2 days'
                });
    
    
            //const k=jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE4MjY0Njk3LCJleHAiOjE3MTg0Mzc0OTd9.2CXay21b6mJVcGTRK_MejAjP1f53jmjvx5wpGtqD_UU","kk59444gsd4r9+-eyery64er94ty9wer49erh4");    
            //console.log(k);
    
            res.json({
                'id':user.id,
                'name':user.name,
                'email':user.email,
                'token':token,
                'type':user.type
            });
        }

        

    }

}