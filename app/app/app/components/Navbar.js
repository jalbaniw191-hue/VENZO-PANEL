export default function Navbar() {
  return (
    <nav
      style={{
        background: "#111827",
        color: "#fff",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #1f2937"
      }}
    >
      <h2>🔥 VENZO PANEL</h2>

      <div>
        <a href="/" style={{ marginRight: "20px" }}>Home</a>
        <a href="/dashboard">Dashboard</a>
      </div>
    </nav>
  );
        }
