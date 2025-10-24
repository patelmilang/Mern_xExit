import { AuthService } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    await AuthService.register(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await AuthService.login(username, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
