import express, { Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import db from './db/database';
import dotenv from 'dotenv'; // Load environment variables from a .env file into process.env
import adminUserQueries from './db/queries/admin_users';
import AdminUser from './types/AdminUserTypes';

// handles dotenv for databasing
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 3001;
const saltRounds = 10;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Test DB connection and table (This is Temporary only!)
db.query("SELECT * FROM admin_users WHERE email = 'sb@gmail.com';")
  .then((res) => console.log('Admin Users Table Found:', res.rows))
  .catch((err) => console.error('Error querying admin_users table:', err));

// API Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello! Digital JukeBox App BackEnd is running!');
});

app.post('/admin-login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and Password are required to continue' });
    return;
  }

  try {
    const isUserExist = await adminUserQueries.getAdminUserByEmail(email);

    if (!isUserExist) {
      console.log('User not found for email:', email);
      res.status(401).json({ error: 'Invalid credentials!' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, isUserExist.password_digest);

    if (!isPasswordValid) {
      console.log('Password does not match for email:', email);
      res.status(401).json({ error: 'Invalid credentials!' });
      return;
    }

    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/admin-register', async (req: Request, res: Response): Promise<void> => {
  console.log('Request Body:', req.body);
  const {firstName, lastName, email, password, role } = req.body;
 
  try {
    const isUserExist = await adminUserQueries.getAdminUserByEmail(email);

    if (isUserExist) {
      console.log('User already exists for email:', email);
      res.status(400).json({ error: 'User already exists!' });
      return;
    }

    const newAdminUser: AdminUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password_digest: password, // Assuming password_digest is the hashed password
      admin_role_id: role,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const addNewAdminUser = await adminUserQueries.addAdminUser(newAdminUser);
    console.log("New user added: ", addNewAdminUser);
    res.status(201).json(addNewAdminUser);
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  };

});

// Static Files for React
//This tells your server to serve the static files (HTML, CSS, JS) that were built by your React app. These files are typically stored in the dist folder after running a build (npm run build).
app.use(express.static(path.resolve(__dirname, '../../Frontend/dist')));

//This is a "catch-all" route for any request that doesn’t match your backend API routes (like /jukeBox). It ensures that React handles the routing for all unknown paths (e.g., /dashboard, /profile).
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../Frontend/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Digital JukeBox App is running on http://localhost:${PORT}`);
});
