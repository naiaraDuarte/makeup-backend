import { Client } from 'pg';

export const db = new Client({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'Les',
    port: 5432
});

db.connect();