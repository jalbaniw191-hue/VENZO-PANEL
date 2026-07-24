import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#0d1117",
          color: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "15px"
          }}
        >
          🔥 VENZO PANEL
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#9ca3af",
            maxWidth: "700px",
            marginBottom: "35px"
          }}
        >
          Professional WhatsApp Bot Dashboard.
          Connect your WhatsApp number, generate a Pair Code or QR Code,
          manage your bot, monitor live status, and control your server
          from one powerful dashboard.
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "14px 30px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Connect WhatsApp
          </button>

          <button
            style={{
              background: "#16a34a",
              color: "#fff",
              border: "none",
              padding: "14px 30px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Open Dashboard
          </button>
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "1000px"
          }}
        >
          <div
            style={{
              background: "#161b22",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h2>📱 WhatsApp</h2>
            <p>Connect using Pair Code or QR Code.</p>
          </div>

          <div
            style={{
              background: "#161b22",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h2>🤖 Bot</h2>
            <p>Manage 200+ commands and settings.</p>
          </div>

          <div
            style={{
              background: "#161b22",
              padding: "20px",
              borderRadius: "12px"
            }}
          >
            <h2>📊 Dashboard</h2>
            <p>View live logs, uptime, and connection status.</p>
          </div>
        </div>
      </main>
    </>
  );
          }
