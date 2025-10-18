import Header from "@/components/Header";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { FudaBackGroundColor } from "@/context/FudaBackGroundColor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <div className="bg-green-100 min-h-screen px-5">
          <AuthProvider>
            <FudaBackGroundColor>
              <Header />
              {children}
            </FudaBackGroundColor>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
