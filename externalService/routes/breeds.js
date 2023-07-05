const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataFilePath = path.join(__dirname, '..', 'data.json');
// Read data from JSON file
function readData() {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
}

// Write data to JSON file
function writeData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET /breeds
router.get('/', (req, res) => {
  const data = readData();
  res.json(data.breeds);
});

// GET /breeds/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const breed = data.breeds.find((breed) => breed.id === id);

  if (breed) {
    res.json(breed);
  } else {
    res.status(404).json({ error: 'Breed not found' });
  }
});

// POST /breeds
router.post('/', (req, res) => {
  const breed = req.body;
  const data = readData();
  const newId = data.breeds.length + 1;
  breed.id = newId;
  data.breeds.push(breed);
  writeData(data);
  res.status(201).json(breed);
});

// PUT /breeds/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBreed = req.body;
  const data = readData();
  const breedIndex = data.breeds.findIndex((breed) => breed.id === id);

  if (breedIndex !== -1) {
    updatedBreed.id = id;
    data.breeds[breedIndex] = updatedBreed;
    writeData(data);
    res.json(updatedBreed);
  } else {
    res.status(404).json({ error: 'Breed not found' });
  }
});

// DELETE /breeds/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const breedIndex = data.breeds.findIndex((breed) => breed.id === id);

  if (breedIndex !== -1) {
    const deletedBreed = data.breeds.splice(breedIndex, 1)[0];
    writeData(data);
    res.json(deletedBreed);
  } else {
    res.status(404).json({ error: 'Breed not found' });
  }
});

module.exports = router;
