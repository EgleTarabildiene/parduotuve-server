import express, {Application, Request, Response} from 'express';
import { skaiciuokleRouter } from './routes/skaiciuokle.router';
import bodyParser from 'body-parser';
import { corsHeaders } from './middlewares/cors.middleware';
import { productsRouter } from './routes/products.router';
import { authRouter } from './routes/auth.router';

const app:Application=express();

//Sutvarkomi duomenys jei buvo siusta forma
app.use(express.urlencoded());

//Sutvarkomi duomenys jei buvo atsiustas JSON failas
app.use(express.json());

//I visus respose hederius ikeliame CORS nurodymus 
app.use(corsHeaders);


//Uzkrauname rautu faila(kur nurodyta skaiciuokles url)
app.use('/skaiciuokle', skaiciuokleRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);


export {app};