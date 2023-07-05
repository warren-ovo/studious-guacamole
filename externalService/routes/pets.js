const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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

// GET /pets
router.get('/', (req, res) => {
  const data = readData();
  res.json(data.pets);
});

// GET /pets/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const pet = data.pets.find((pet) => pet.id === id);

  if (pet) {
    res.json(pet);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
});

// POST /pets
router.post('/', (req, res) => {
  const pet = req.body;
  const data = readData();
  const newId = data.pets.length + 1;
  pet.id = newId;
  data.pets.push(pet);
  writeData(data);
  res.status(201).json(pet);
});

// PUT /pets/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPet = req.body;
  const data = readData();
  const petIndex = data.pets.findIndex((pet) => pet.id === id);

  if (petIndex !== -1) {
    updatedPet.id = id;
    data.pets[petIndex] = updatedPet;
    writeData(data);
    res.json(updatedPet);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
});

// DELETE /pets/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const petIndex = data.pets.findIndex((pet) => pet.id === id);

  if (petIndex !== -1) {
    const deletedPet = data.pets.splice(petIndex, 1)[0];
    writeData(data);
    res.json(deletedPet);
  } else {
    res.status(404).json({ error: 'Pet not found' });
  }
});

module.exports = router;
