import express from 'express';
import bodyParser from 'body-parser';
import { openDB } from './db.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const initDatabase = async () => {
    try {
        const db = await openDB();

        await db.run(`
      CREATE TABLE IF NOT EXISTS types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL
      );
    `);

        await db.run(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type_id INTEGER,
      description TEXT,
      gluten BOOLEAN,
      vegan BOOLEAN,
      friday INTEGER DEFAULT 0,
      saturday INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (type_id) REFERENCES types(id)
    );
  `);

        console.log('✅ Database initialized with the "types" table.');
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);  
    }
};

initDatabase();

app.get('/api/types', async (req, res) => {
    try {
        const db = await openDB();
        const types = await db.all('SELECT * FROM types'); 
        res.json(types); 
    } catch (err) {
        console.error('Error fetching types:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/types', async (req, res) => {
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({ error: 'Type is required' });
    }

    try {
        const db = await openDB();
        await db.run('INSERT INTO types (type) VALUES (?)', [type]);  
        res.status(201).json({ message: 'Type added successfully' });
    } catch (err) {
        console.error('Error adding type:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});