
import { AuthProvider } from "@/context/UserContext";
import "./globals.css";
import { ServiceProvider } from "@/context/ServiceContext";
import { TransactionProvider } from "@/context/TransactionsContext";
import { CardsProvider } from "@/context/CardsContext";
import { Background } from "@/components/background/Background";

export const metadata = {
  title: "Digital Money App",
  description: "Trabajo Final | Proyecto Frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <AuthProvider>
        <CardsProvider>
          <TransactionProvider>
            <ServiceProvider>

              <body className="flex items-center justify-center h-[100vh]">
                <main className="w-full max-w-[1824px] mx-auto bg-slate-900 h-screen lg:h-[calc(100vh-48px)] z-50 lg:rounded-xl">
                  {children}                  
                </main>
                <Background />
              </body>

            </ServiceProvider>
          </TransactionProvider>
        </CardsProvider>
      </AuthProvider>
    </html>
  );
}
