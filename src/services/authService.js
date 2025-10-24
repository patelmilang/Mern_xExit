import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../models/userModel.js";

const SECRET = process.env.JWT_SECRET || "secret123";

export const AuthService = {
  register: async (username, password) => {
    const existing = users.find(u => u.username === username);
    if (existing) throw new Error("User already exists");
    const hashed = await bcrypt.hash(password, 10);
    const user = { username, password: hashed, role: "Employee" };
    users.push(user);
    return user;
  },

  login: async (username, password) => {
    const user = users.find(u => u.username === username);
    if (!user) throw new Error("Invalid credentials");
   //console.log( await bcrypt.hash(password, 10)); // Added to ensure consistent timing
    const valid = await bcrypt.compare(password, user.password);
    //console.log("Password valid:", valid);
    if (!valid) throw new Error("Invalid credentials");
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET, { expiresIn: "1h" });
    return token;
  }
};
