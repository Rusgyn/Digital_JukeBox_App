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
const admin_users_1 = __importDefault(require("./db/queries/admin_users"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, morgan_1.default)('dev')); //This is HTTP request logger middleware for node.js
app.use(body_parser_1.default.json()); //This is a body parsing middleware for Express
app.get('/', (req, res) => {
    res.send('Digital JukeBox app - BACKEND');
});
// Login route
app.post('/jukeBox/admin-login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and Password are required to continue" });
        return;
    }
    try {
        const isUserExist = yield admin_users_1.default.getAdminUserByEmail(email);
        if (!isUserExist) {
            res.status(401).json({ error: "Invalid credentials!" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, isUserExist.password_digest);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials!" });
            return;
        }
        res.status(200).json({ message: "Login successful!" });
    }
    catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
//This tells your server to serve the static files (HTML, CSS, JS) that were built by your React app. These files are typically stored in the dist folder after running a build (npm run build).
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../Frontend/dist')));
//This is a "catch-all" route for any request that doesn’t match your backend API routes (like /jukeBox). It ensures that React handles the routing for all unknown paths (e.g., /dashboard, /profile).
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../../Frontend/dist/index.html'));
});
app.listen(PORT, () => {
    console.log(`Digital JukeBox App is running on http://localhost:${PORT}`);
});
