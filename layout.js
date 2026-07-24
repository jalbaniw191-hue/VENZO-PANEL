export const metadata = {
  title: "VENZO PANEL",
  description: "WhatsApp Bot Dashboard"
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
    }
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "60px 20px",
          textAlign: "center"
        }}
      >
        <h1>VENZO PANEL</h1>

        <p style={{ marginTop: "20px" }}>
          Professional WhatsApp Bot Dashboard
        </p>

        <button
          style={{
            marginTop: "30px",
            padding: "14px 30px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px"
          }}
        >
          Connect WhatsApp
        </button>
      </main>
    </>
  );
    }
