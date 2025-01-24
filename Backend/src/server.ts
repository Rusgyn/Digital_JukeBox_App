// import express, { Request, Response } from 'express';
// import path from 'path';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import bcrypt from 'bcryptjs';
// import db from './db/database';

// import adminUserQueries from './db/queries/admin_users';

// const app = express();
// const PORT = 3001;

// app.use(morgan('dev')); //This is HTTP request logger middleware for node.js
// app.use(bodyParser.json()); //This is a body parsing middleware for Express


// db.query('SELECT * FROM admin_users LIMIT 1')
//   .then((res) => console.log('Admin Users Table Found:', res.rows))
//   .catch((err) => console.error('Error querying admin_users table:', err));


// app.get('/jukeBox', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

// // Login route
// app.post('/jukeBox/admin-login', async (req: Request, res: Response): Promise<void> => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400).json({error: "Email and Password are required to continue" });
//     return;
//   }

//   try {
//     const isUserExist = await adminUserQueries.getAdminUserByEmail(email);

//     if (!isUserExist) {
//       res.status(401).json( {error: "Invalid credentials!"});
//       return;
//     }

//     const isPasswordValid = await bcrypt.compare(password, isUserExist.password_digest);

//     if (!isPasswordValid) {
//       res.status(401).json( {error: "Invalid credentials!"});
//       return;
//     }

//     res.status(200).json( {message: "Login successful!"} );

//   } catch(error) {
//     console.error('Error logging in: ', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// //This tells your server to serve the static files (HTML, CSS, JS) that were built by your React app. These files are typically stored in the dist folder after running a build (npm run build).
// app.use(express.static(path.resolve(__dirname, '../../Frontend/dist')));

// //This is a "catch-all" route for any request that doesn’t match your backend API routes (like /jukeBox). It ensures that React handles the routing for all unknown paths (e.g., /dashboard, /profile).
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../Frontend/dist/index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Digital JukeBox App is running on http://localhost:${PORT}`)
// });


import express, { Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import db from './db/database';
import adminUserQueries from './db/queries/admin_users';
import dotenv from 'dotenv'; // Load environment variables from a .env file into process.env

dotenv.config(); // Load environment variables from a .env file into process.env
// handles dotenv for databasing
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 3001;
const saltRounds = 10;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Set schema search path (explicitly set it to 'public')
// db.query('SET search_path TO public;')
//   .then(() => console.log('Schema search path set to public'))
//   .catch((err) => console.error('Error setting schema search path:', err));

// Test DB connection and table
db.query("SELECT * FROM admin_users WHERE email = 'sb@gmail.com';")
  .then((res) => console.log('Admin Users Table Found:', res.rows))
  .catch((err) => console.error('Error querying admin_users table:', err));

// API Routes
app.get('/jukeBox', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/jukeBox/admin-login', async (req: Request, res: Response): Promise<void> => {
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

        // Compare the plain-text password
        // if (password !== isUserExist.password_digest) {
        //   console.log('Password does not match for email:', email);
        //   res.status(401).json({ error: "Invalid email or password" });
        //   return;
        // }
    
    // Log the plaintext password and hashed password from the database
    console.log('Plaintext Password:', password);

    // const hashedPassword = await bcrypt.hash(isUserExist.password_digest, saltRounds);
    //console.log('Hashed Password in DB:', hashedPassword);
    console.log('Hashed Password in DB:', isUserExist.password_digest);

    const isPasswordValid = await bcrypt.compare(password, isUserExist.password_digest);

    console.log('Password Comparison Result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Password does not match for email:', email);
      res.status(401).json({ error: 'Invalid credentials!' });
      return;
    }

    console.log('Login successful for email:', email);
    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Static Files for React
app.use(express.static(path.resolve(__dirname, '../../Frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../Frontend/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Digital JukeBox App is running on http://localhost:${PORT}`);
});
