import express, {Application, Request, Response} from 'express';
import { skaiciuokleRouter } from './routes/skaiciuokle.router';
import bodyParser from 'body-parser';
import { corsHeaders } from './middlewares/cors.middleware';
import { productsRouter } from './routes/products.router';
import { authRouter } from './routes/auth.router';
import { authMiddleware } from './middlewares/auth.middleware';
import { userRouter } from './routes/user.router';

const app:Application=express();

//Sutvarkomi duomenys jei buvo siusta forma
app.use(express.urlencoded());

//Sutvarkomi duomenys jei buvo atsiustas JSON failas
app.use(express.json());

//Į visus response header'ius įkeliame CORS nurodymus
app.use(corsHeaders);

//app.get('/products',authMiddleware);

//Užkrauname route failą (kur nurodyti skaičiuoklės url)
app.use('/skaiciuokle', skaiciuokleRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use("/users", userRouter);

export {app};