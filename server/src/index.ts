import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import { connectDB } from './config/db';

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.listen({ port: PORT }, () => {
    console.log(`httpServer ready at http://localhost:${PORT}`);
})