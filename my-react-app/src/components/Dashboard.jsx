export default function Dashboard({ token }) {
    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Welcome to Student Dashboard</h2>
            <p>
                <strong>JWT Token:</strong> {token}
            </p>
        </div>
    );
}
