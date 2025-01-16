import express from 'express';

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Digital JukeBox app - BACKEND');
});

app.listen(PORT, () => {
  console.log(`Digital JukeBox App is running on http://localhost:${PORT}`)
});