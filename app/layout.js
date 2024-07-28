import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "./storeProvider";
import Sidebar from "@/components/sideabar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGPT Clone",
  description: "ChatGPT Clone app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", inter.className)}
      >
        <StoreProvider>
          <main className="flex min-h-screen items-center">
            <div className=" bg-gray-900 min-h-screen py-2 w-64">
              <Sidebar />
            </div>
            <div className=" bg-gray-800 grow min-h-screen">{children}</div>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
