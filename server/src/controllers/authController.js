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
exports.logout = exports.getMe = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('📥 Register Request Received:', req.body);
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.error('❌ Missing fields in request body');
            return res.status(400).json({ error: 'All fields are required' });
        }
        // check if user already exists
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.error('❌ Email already in use:', email);
            return res.status(400).json({ error: 'Email already in use' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        console.log('✅ New user created:', user);
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: '7d',
        });
        res.status(201).json({ token });
    }
    catch (error) {
        console.error('🔥 Registration Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ user: { id: user.id, email: user.email }, token });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.login = login;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json({ user: { id: user.id, email: user.email, name: user.name } });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getMe = getMe;
const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // true if using HTTPS
    });
    res.json({ message: 'Logged out successfully' });
};
exports.logout = logout;
