const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

const user = {
  id: 1,
  username: "admin",
  password: "1234",
};


app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== user.username || password !== user.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username }, SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});


const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = decoded;
    next();
  });
};


app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}`,
    user: req.user,
  });
});

app.listen(3001, () => console.log("Server running on 3001"));