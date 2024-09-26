const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('edit_szoveg'));
app.use(express.json());


app.get('/read', (req, res) => {
  const filePath = path.join(__dirname, 'szoveg.txt');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba történt a fájl beolvasása közben.' });
    }
    res.json({ content: data });
  });
});

app.post('/save', (req, res) => {
  const { content } = req.body;
  const filePath = path.join(__dirname, 'szoveg.txt');

  fs.writeFile(filePath, content, 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Hiba történt a fájl mentése közben.' });
    }
    res.json({ message: 'Sikeres mentés!' });
  });
});

app.listen(PORT, () => {
  console.log(`A szerver fut a http://localhost:${PORT} címen`);
});
