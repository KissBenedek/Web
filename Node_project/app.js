import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import __dirname from './util/rootpath.js';
import scheduleRouter from './scheduleRouter.js'; // Importáld a schedule routert

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Kérjük, hogy a JSON adatokat is kezelje

// Használja a schedule routert az /api/schedule útvonalon
app.use('/api/schedule', scheduleRouter);

app.listen(PORT, () => console.log(`Server listens on port http://localhost:${PORT}`));
