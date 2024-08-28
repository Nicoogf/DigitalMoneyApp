
import { AuthProvider } from "@/context/UserContext";
import "./globals.css";
import { ServiceProvider } from "@/context/ServiceContext";
import { TransactionProvider } from "@/context/TransactionsContext";

export const metadata = {
  title: "Digital Money App",
  description: "Trabajo Final | Proyecto Frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <AuthProvider>
        <TransactionProvider>
          <ServiceProvider>

            <body className="flex items-center h-[100vh]">
              <main className="w-full max-w-[1920px] mx-auto bg-slate-900 h-[calc(100vh-48px)]">
                {children}
              </main>
            </body>

          </ServiceProvider>
        </TransactionProvider>
      </AuthProvider>
    </html>
  );
}
