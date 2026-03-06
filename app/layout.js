import { MainProvider } from "@/context/MainContext";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";

export const metadata = {
  title: "Elhoda",
  description: "bedsheets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <UserProvider>
          <MainProvider>
            {children}
          </MainProvider>
        </UserProvider>
      </body>
    </html>
  );
}
