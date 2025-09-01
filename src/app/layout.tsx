import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="bg-green-100">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
