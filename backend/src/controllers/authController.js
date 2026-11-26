
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import users from "../data/users.js";
import generateToken from "../utils/generateToken.js";

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Register a new user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        if (password.length < 8 || password.length > 72) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 8 and 72 characters"
            });
        }

        if (name.trim().length > 100) {
            return res.status(400).json({
                success: false,
                message: "Name cannot exceed 100 characters"
            });
        }

        const existingUser = users.find(
            user => user.email === normalizedEmail
        );

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: randomUUID(),
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: "student"
        };

        users.push(newUser);

        const token = generateToken(newUser);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                },
                token
            }
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Login an existing user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        const user = users.find(
            user => user.email === normalizedEmail
        );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// Get currently authenticated user
export const getMe = (req, res) => {
    const user = users.find(
        user => user.id === req.user.id
    );

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "User details retrieved successfully",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    });
};
