const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

const PORT = 5000;

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}...`);
});
