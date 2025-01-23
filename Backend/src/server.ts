import express, { Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

import adminUserQueries from './db/queries/admin_users';

const app = express();
const PORT = 3001;

app.use(morgan('dev')); //This is HTTP request logger middleware for node.js
app.use(bodyParser.json()); //This is a body parsing middleware for Express

app.get('/', (req: Request, res: Response) => {
  res.send('Digital JukeBox app - BACKEND');
});

// Login route
app.post('/jukeBox/admin-login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({error: "Email and Password are required to continue" });
    return;
  }

  try {
    const isUserExist = await adminUserQueries.getAdminUserByEmail(email);

    if (!isUserExist) {
      res.status(401).json( {error: "Invalid credentials!"});
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, isUserExist.password_digest);

    if (!isPasswordValid) {
      res.status(401).json( {error: "Invalid credentials!"});
      return;
    }

    res.status(200).json( {message: "Login successful!"} );

  } catch(error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//This tells your server to serve the static files (HTML, CSS, JS) that were built by your React app. These files are typically stored in the dist folder after running a build (npm run build).
app.use(express.static(path.resolve(__dirname, '../../Frontend/dist')));

//This is a "catch-all" route for any request that doesn’t match your backend API routes (like /jukeBox). It ensures that React handles the routing for all unknown paths (e.g., /dashboard, /profile).
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../Frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Digital JukeBox App is running on http://localhost:${PORT}`)
});