"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("./db/database"));
const dotenv_1 = __importDefault(require("dotenv")); // Load environment variables from a .env file into process.env
const admin_users_1 = __importDefault(require("./db/queries/admin_users"));
// handles dotenv for databasing
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
const PORT = 3001;
const saltRounds = 10;
// Middleware
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
// Test DB connection and table (This is Temporary only!)
database_1.default.query("SELECT * FROM admin_users WHERE email = 'sb@gmail.com';")
    .then((res) => console.log('Admin Users Table Found:', res.rows))
    .catch((err) => console.error('Error querying admin_users table:', err));
// API Routes
app.get('/', (req, res) => {
    res.send('Hello! Digital JukeBox App BackEnd is running!');
});
app.post('/admin-login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Email and Password are required to continue' });
        return;
    }
    try {
        const isUserExist = yield admin_users_1.default.getAdminUserByEmail(email);
        if (!isUserExist) {
            console.log('User not found for email:', email);
            res.status(401).json({ error: 'Invalid credentials!' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, isUserExist.password_digest);
        if (!isPasswordValid) {
            console.log('Password does not match for email:', email);
            res.status(401).json({ error: 'Invalid credentials!' });
            return;
        }
        res.status(200).json({ message: 'Login successful!' });
    }
    catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/admin-register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request Body:', req.body);
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const isUserExist = yield admin_users_1.default.getAdminUserByEmail(email);
        if (isUserExist) {
            console.log('User already exists for email:', email);
            res.status(400).json({ error: 'User already exists!' });
            return;
        }
        const newAdminUser = {
            first_name: firstName,
            last_name: lastName,
            email,
            password_digest: password, // Assuming password_digest is the hashed password
            admin_role_id: role,
            created_at: new Date(),
            updated_at: new Date(),
        };
        const addNewAdminUser = yield admin_users_1.default.addAdminUser(newAdminUser);
        console.log("New user added: ", addNewAdminUser);
        res.status(201).json(addNewAdminUser);
    }
    catch (error) {
        console.error('Error registering user: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
}));
// Static Files for React
//This tells your server to serve the static files (HTML, CSS, JS) that were built by your React app. These files are typically stored in the dist folder after running a build (npm run build).
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../Frontend/dist')));
//This is a "catch-all" route for any request that doesn’t match your backend API routes (like /jukeBox). It ensures that React handles the routing for all unknown paths (e.g., /dashboard, /profile).
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../Frontend/dist/index.html'));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Digital JukeBox App is running on http://localhost:${PORT}`);
});
