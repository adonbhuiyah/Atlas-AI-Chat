import { AppContextProvider } from "@/context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "./prism.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Atlas",
  description: "Chat with Atlas AI.",
  keywords: ["Atlas", "Chat with Atlas AI.", "Pulse Robot AI"],
  authors: [{ name: "Adon Bhuiyah", url: "https://adonr.dev" }],
  creator: "Adon Bhuiyah",
  publisher: "Adon Bhuiyah",
  category: "technology",
  applicationName: "Atlas",

  metadataBase: new URL("https://chat.pulserobots.com"),

  // 📱 Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    title: "Atlas",
    description: "Chat with Atlas AI.",
    url: "https://chat.pulserobots.com",
    siteName: "Atlas",
    images: [
      {
        url: "/new-og-image.png",

        alt: "Atlas Opengraph Image",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 🐦 Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Atlas",
    description: "Chat with Atlas AI.",
    site: "@PulseRobots",
    creator: "@AdonBhuiyah",
    images: [
      {
        url: "/new-og-image.png",
        alt: "Atlas Opengraph Image",
        type: "image/png",
      },
    ],
  },

  // 📱 App Icons
  icons: {
    icon: "/favicon.jpeg",
  },

  // 🤖 Robots & Google Bot Control
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },

  // 🕰️ Viewport & Charset (Optional for <head> injection)
  viewport: "width=device-width, initial-scale=1, object-fit=cover",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en" className="hydrated">
          <body className={`${inter.className} antialiased`}>
            <Toaster
              toastOptions={{
                success: { style: { background: "black", color: "white" } },
                error: { style: { background: "black", color: "white" } },
              }}
            />
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
