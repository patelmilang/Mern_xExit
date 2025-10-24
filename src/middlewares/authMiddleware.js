import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = (!authHeader.split(" ")[1])? authHeader : authHeader.split(" ")[1];
  try {
     
    req.user = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
