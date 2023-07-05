const express = require('express');
const petsRouter = require('./routes/pets');
const ownersRouter = require('./routes/owners');
const breedsRouter = require('./routes/breeds');

const app = express();
const PORT = 3030;

app.use((req, res, next) => {
  console.log((new Date).toLocaleTimeString() ,'got request ', req.url);
  next();
})

// Routes
app.use('/pets', petsRouter);
app.use('/owners', ownersRouter);
app.use('/breeds', breedsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
