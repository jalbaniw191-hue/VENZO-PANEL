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
