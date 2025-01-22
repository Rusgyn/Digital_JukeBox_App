import express from 'express';
import path from 'path';
import morgan from 'morgan';

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Digital JukeBox app - BACKEND');
});

//This tells your server to serve the static files (HTML, CSS, JS) that were built by your React app. These files are typically stored in the dist folder after running a build (npm run build).
app.use(express.static(path.resolve(__dirname, '../../Frontend/dist')));

//This is a "catch-all" route for any request that doesn’t match your backend API routes (like /api). It ensures that React handles the routing for all unknown paths (e.g., /dashboard, /profile).
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../Frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Digital JukeBox App is running on http://localhost:${PORT}`)
});