import express from 'express';
import routes from './routes/authRoutes.js';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
    res.send('hola');
})

routes(app);

app.listen(process.env.API_PORT,() => {
    console.log(`Server listening on port  \`${process.env.API_PORT}\``);
})
