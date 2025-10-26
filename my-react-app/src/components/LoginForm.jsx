import React, { useState } from "react";

export default function LoginForm({ programs, setToken }) {
    const [formData, setFormData] = useState({
        program_id: "",
        username: "",
        password: "",
        device: "web",
    });
    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Login response:", data);
                if (data.token) {
                    setToken(data.token);
                    localStorage.setItem("token", data.token); // persist
                } else {
                    setError(data.message || "Invalid credentials");
                }
            })
            .catch((err) => setError("Login failed: " + err.message));
    }


    return (
        <div style={{ maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
            <h2>Student Login</h2>
            <form onSubmit={handleSubmit}>
                <select name="program_id" onChange={handleChange} required>
                    <option value="">Select Program</option>
                    {programs.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.program}
                        </option>
                    ))}
                </select>

                <br />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
