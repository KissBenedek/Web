import express from 'express';
import fs from 'fs';
import path from 'path';
import __dirname from './util/rootpath.js'; // Győződj meg róla, hogy ez az útvonal helyes

const router = express.Router();
const scheduleFilePath = path.join(__dirname, 'data', 'schedule.json'); // A JSON fájl elérési útja

// GET - Az órarend lekérése
router.get('/', (req, res) => {
    fs.readFile(scheduleFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading schedule.');
        res.json(JSON.parse(data));
    });
});

// DELETE - Óra törlése
router.delete('/', (req, res) => {
    const { day, timeSlot } = req.body;

    fs.readFile(scheduleFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading schedule.');

        const schedule = JSON.parse(data);

        // Ellenőrizzük, hogy a megadott nap létezik-e
        if (schedule[day]) {
            // Ellenőrizzük, hogy a megadott időpont létezik-e
            if (schedule[day][timeSlot]) {
                // Csere "-" karakterre a megadott időpontnál
                schedule[day][timeSlot] = '-';

                fs.writeFile(scheduleFilePath, JSON.stringify(schedule, null, 2), (err) => {
                    if (err) return res.status(500).send('Error saving schedule.');
                    res.send('Class replaced with "-" successfully.');
                });
            } else {
                res.status(404).send('Class not found for the specified time slot.');
            }
        } else {
            res.status(404).send('Class not found for the specified day.');
        }
    });
});

// PUT - Óra frissítése
router.put('/', (req, res) => {
    const { day, timeSlot, newClassName } = req.body;
    console.log('Received update request:', day, timeSlot, newClassName);

    fs.readFile(scheduleFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading schedule.');

        const schedule = JSON.parse(data);
        if (schedule[day] && schedule[day][timeSlot]) {
            schedule[day][timeSlot] = newClassName;  // Az óra frissítése a JSON-ban

            fs.writeFile(scheduleFilePath, JSON.stringify(schedule, null, 2), (err) => {
                if (err) return res.status(500).send('Error saving schedule.');
                res.send('Class updated successfully.');
            });
        } else {
            res.status(404).send('Class not found.');
        }
    });
});




export default router;
