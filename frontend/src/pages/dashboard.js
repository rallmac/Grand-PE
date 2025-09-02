import React from "react";

function DashboardSidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#2d6a4f",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem 1rem",
        position: "fixed",
        top: 0,
        left: 0,
        boxShadow: "2px 0 8px rgba(0,0,0,0.07)",
      }}
    >
      <h3 style={{ marginBottom: "2rem" }}>Dashboard</h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "1.2rem" }}>
            <a href="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </a>
          </li>
          <li style={{ marginBottom: "1.2rem" }}>
            <a href="/dashboard/users" style={{ color: "#fff", textDecoration: "none" }}>
              Users
            </a>
          </li>
          <li style={{ marginBottom: "1.2rem" }}>
            <a href="/dashboard/settings" style={{ color: "#fff", textDecoration: "none" }}>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function DashboardContent() {
  return (
    <main style={{ marginLeft: 220, padding: "2rem" }}>
      <h2>Welcome to the Dashboard</h2>
      <p>This is your admin dashboard. Add widgets, stats, and quick links here.</p>
      {/* Add more dashboard widgets/components below */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <div style={{ background: "#fff", borderRadius: 8, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h4>Total Users</h4>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d6a4f" }}>123</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 8, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h4>Active Projects</h4>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d6a4f" }}>7</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 8, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h4>Pending Requests</h4>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#2d6a4f" }}>4</p>
        </div>
      </div>
    </main>
  );
}

function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
      <DashboardSidebar />
      <DashboardContent />
    </div>
  );
}

export default DashboardPage;