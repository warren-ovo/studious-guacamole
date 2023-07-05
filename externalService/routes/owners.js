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

// GET /owners
router.get('/', (req, res) => {
  const data = readData();
  res.json(data.owners);
});

// GET /owners/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const owner = data.owners.find((owner) => owner.id === id);

  if (owner) {
    res.json(owner);
  } else {
    res.status(404).json({ error: 'Owner not found' });
  }
});

// POST /owners
router.post('/', (req, res) => {
  const owner = req.body;
  const data = readData();
  const newId = data.owners.length + 1;
  owner.id = newId;
  data.owners.push(owner);
  writeData(data);
  res.status(201).json(owner);
});

// PUT /owners/:id
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedOwner = req.body;
  const data = readData();
  const ownerIndex = data.owners.findIndex((owner) => owner.id === id);

  if (ownerIndex !== -1) {
    updatedOwner.id = id;
    data.owners[ownerIndex] = updatedOwner;
    writeData(data);
    res.json(updatedOwner);
  } else {
    res.status(404).json({ error: 'Owner not found' });
  }
});

// DELETE /owners/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const ownerIndex = data.owners.findIndex((owner) => owner.id === id);

  if (ownerIndex !== -1) {
    const deletedOwner = data.owners.splice(ownerIndex, 1)[0];
    writeData(data);
    res.json(deletedOwner);
  } else {
    res.status(404).json({ error: 'Owner not found' });
  }
});

module.exports = router;
