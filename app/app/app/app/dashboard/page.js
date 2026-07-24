import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#0d1117",
          minHeight: "100vh",
          color: "#fff",
          padding: "30px"
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          📊 VENZO Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px"
          }}
        >

          {/* WhatsApp Connect */}
          <div
            style={{
              background: "#161b22",
              padding: "20px",
              borderRadius: "15px"
            }}
          >
            <h2>📱 WhatsApp Connect</h2>

            <input
              type="text"
              placeholder="923001234567"
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "8px"
              }}
            />

            <button
              style={{
                width: "100%",
                marginTop: "15px",
                padding: "12px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px"
              }}
            >
              Generate Pair Code
            </button>

            <button
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                background: "#16a34a",
                color: "#fff",
                border: "none",
                borderRadius: "8px"
              }}
            >
              Generate QR Code
            </button>
          </div>

          {/* Status */}
          <div
            style={{
              background: "#161b22",
              padding: "20px",
              borderRadius: "15px"
            }}
          >
            <h2>🟢 Bot Status</h2>

            <p>Server : Online</p>
            <p>WhatsApp : Not Connected</p>
            <p>Mode : Public</p>
            <p>Commands : 200+</p>
          </div>

          {/* Logs */}
          <div
            style={{
              background: "#161b22",
              padding: "20px",
              borderRadius: "15px"
            }}
          >
            <h2>📜 Live Logs</h2>

            <div
              style={{
                background: "#000",
                padding: "15px",
                borderRadius: "10px",
                minHeight: "200px"
              }}
            >
              Waiting for server logs...
            </div>
          </div>

        </div>
      </main>
    </>
  );
          }
