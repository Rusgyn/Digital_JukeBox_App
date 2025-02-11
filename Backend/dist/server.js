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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_session_1 = __importDefault(require("express-session"));
const database_1 = __importDefault(require("./db/database"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv")); // Load env var from .env file into process.env
const axios_1 = __importDefault(require("axios"));
/* Queries */
const admin_users_1 = __importDefault(require("./db/queries/admin/admin_users"));
const playlist_1 = __importDefault(require("./db/queries/jukeBox/playlist"));
/* Utilities */
const sessionUtils_1 = __importDefault(require("./utils/sessionUtils"));
const app = (0, express_1.default)();
const PORT = 3001;
const saltRounds = 10;
// handles dotenv for databasing. Loaded at the start of your app.
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
//CORS middleware. Should be added before any other routes or middleware this ensures that the CORS headers are properly set in the response before any other logic 
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', //or more [,'http://another-allowed-origin.com']
    credentials: true
}));
// Middleware
app.use((0, morgan_1.default)('dev')); // HTTP request logger
app.use(express_1.default.json()); // Parse JSON payloads.
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded payloads
// Test DB connection and table during development only (TEMPORARY !)
database_1.default.query("SELECT * FROM admin_users WHERE email = 'sb@gmail.com';")
    .then((res) => console.log('Admin Users Table Found:', res.rows))
    .catch((err) => console.error('Error querying admin_users table:', err));
// Session Configuration. **Always place express-session after express.json() and express.urlencoded() middleware for session handling to work properly.
const sessionSecret = process.env.PGSESSION_SECRET;
if (sessionSecret) {
    app.use((0, express_session_1.default)({
        secret: sessionSecret, // Secret used to sign the session ID cookie
        resave: false, // Don't save session if unmodified
        saveUninitialized: false, // Don't create session until something stored
        cookie: {
            httpOnly: true, // Prevent client-side scripts from accessing the cookie
            secure: false, // `true` for HTTPS in production
            maxAge: 1000 * 60 * 60, // 1 hour session only
        }
    }));
}
else {
    // If the SESSION_SECRET is not set, a warning message
    console.warn('SESSION_SECRET is not set in the .env file. Please ensure it is defined for secure session handling.');
    process.exit(1); // terminate the app when secret is not found.
}
;
// USER API Routes
app.get('/', (req, res) => {
    res.send('Hello! Digital JukeBox App BackEnd is running!');
});
app.get('/check-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("You are now checking the session");
    try {
        if ((0, sessionUtils_1.default)(req.session)) {
            console.log("User is active. Session data: ", req.session);
            console.log("=== END ===");
            return res.json({ loggedIn: true });
        }
        console.log("No active session, redirecting to login page");
        res.json({ loggedIn: false });
    }
    catch (error) {
        console.error('Error checking session Backend:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/admin-login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log('The Admin Login info: ', req.body);
    console.log('=== END ===');
    if (!username || !password) {
        res.status(400).json({ error: 'Email and Password are required to continue' });
        return;
    }
    try {
        const isUserExist = yield admin_users_1.default.getAdminUserByEmail(username);
        console.log("isUserExist data: ", isUserExist);
        console.log("=== END ===");
        if (!isUserExist) {
            console.log('User not found for email:', username);
            res.status(401).json({ error: 'Invalid credentials!' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, isUserExist.password_digest);
        if (!isPasswordValid) {
            console.log('Password does not match for email:', username);
            res.status(401).json({ error: 'Invalid credentials!' });
            return;
        }
        if (isUserExist && isPasswordValid) {
            const adminUserId = isUserExist.id;
            const adminUserEmail = isUserExist.email;
            if (adminUserId !== undefined) {
                req.session.loggedAdminUser = { id: adminUserId, username: adminUserEmail };
                console.log("loggedAdminUser is: ", req.session.loggedAdminUser);
                console.log("=== END ===");
                res.status(200).json({ message: 'Login successful!' });
            }
            else {
                console.error('User ID is undefined');
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
        }
    }
    catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/admin-logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Logout route hit');
    console.log('Session data:', req.session);
    console.log("====END====");
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
        else {
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successful!' });
        }
    });
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
            password_digest: password, // password_digest is the hashed password
            admin_role_id: role,
            created_at: new Date(),
            updated_at: new Date(),
        }; //AdminUser types
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
//MUSIC API Routes
app.get('/media-search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchQuery } = req.query;
    //console.log("GET Media searchQuery is: ", searchQuery);
    try {
        const response = yield axios_1.default.get('https://deezerdevs-deezer.p.rapidapi.com/search', {
            params: { q: searchQuery },
            headers: {
                'x-rapidapi-key': process.env.PGVITE_DEEZER_API_KEY,
                'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        });
        //console.log("Searched Media: ", response.data);
        return res.json(response.data); // { data: [data, ..] }
    }
    catch (error) {
        //console.error('Error checking session Backend:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/add-music', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Search Music Route");
    const { selectedSong } = req.body;
    console.log("Add-music route. req body: ", selectedSong);
    try {
        for (const song_ext_id of selectedSong) {
            const isSongExist = yield playlist_1.default.getSongByExternalId(song_ext_id);
            if (isSongExist) {
                console.log('Song already exist with external_id: ', song_ext_id);
                res.status(400).json({ error: 'Song already exists!' });
                return;
            }
            ;
            const newPlaylist = {
                song_external_id: song_ext_id,
                song_like: 0,
                created_at: new Date(),
                updated_at: new Date()
            }; //Playlist types
            const addNewSong = yield playlist_1.default.addSong(newPlaylist);
            console.log("New song added: ", addNewSong);
            res.status(201).json(addNewSong);
        }
    }
    catch (error) {
        console.log('Error adding a new song: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    ;
}));
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
// Static Files for React
//This tells your server to serve the static files (HTML, CSS, JS) that were built by your React app. These files are typically stored in the dist folder after running a build (npm run build).
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../Frontend/dist')));
//This is a "catch-all" route for any request that doesn’t match your backend API routes (like /jukeBox). It ensures that React handles the routing for all unknown paths (e.g., /dashboard, /profile).
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../Frontend/dist/index.html'));
});
// Catch-all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Digital JukeBox App is running on http://localhost:${PORT}`);
});
