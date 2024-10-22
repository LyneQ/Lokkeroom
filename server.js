import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import lobbyRoutes from './routes/lobbyRoutes.js';
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
    res.send('hola');
});

authRoutes(app);
lobbyRoutes(app);
messageRoutes(app);


app.listen(process.env.API_PORT,() => {
    console.log(`Server listening on port  \`${process.env.API_PORT}\``);
})
