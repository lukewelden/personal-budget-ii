import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';
import { dbConnection } from '../settings.js';
dotenv.config();

export const pool = new Pool({ 
    user: dbConnection.user,
    host: dbConnection.host,
    database: dbConnection.database,
    password: dbConnection.password,
    port: dbConnection.port 
});