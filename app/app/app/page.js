export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0d1117",
        color: "#fff",
        flexDirection: "column"
      }}
    >
      <h1>🔥 VENZO PANEL</h1>
      <p>WhatsApp Bot Dashboard</p>

      <button
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          borderRadius: "10px",
          border: "none",
          background: "#2563eb",
          color: "#fff",
          fontSize: "16px"
        }}
      >
        Connect WhatsApp
      </button>
    </main>
  );
          }
