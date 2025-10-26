import express from "express";
import axios from "axios";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const API_BASE = "http://puc.ac.bd:8016/api";

const JWT_SECRET = "replace_this_with_a_strong_secret";

app.get("/programs", async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE}/Basic/get_all_programs`);
        const programs = Array.isArray(response.data) ? response.data : (Array.isArray(response.data.data) ? response.data.data : []);
        res.json(programs);
    } catch (err) {
        console.error("Error fetching programs:", err.message);
        res.status(500).json([]);
    }
});

app.post("/login", (req, res) => {
    const { username, password, program_id } = req.body;

    // DEV: accept a test user
    if (username === "test" && password === "1234") {
        const token = "fake-jwt-token";
        return res.json({ token, source: "dev-mock" });
    }

    // Otherwise, call real PUC API
    axios.post(`${API_BASE}/Auth/student_login`, req.body)
        .then(response => res.json(response.data))
        .catch(err => res.status(401).json({ message: "PUC login failed", error: err.message }));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
