import type { Metadata } from "next";
import "../globals.css";
import { CartProvider, CartItem } from "@/providers/CartContext";
import { AuthProvider } from "@/providers/AuthContext";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Goni's Shea Butter | Pure, Unrefined Shea Butter from Northern Nigeria",
  description:
    "Premium unrefined shea butter sourced directly from Northern Nigeria. Natural skin & hair nourishment rooted in nature. Shop raw shea butter, body butter, and bulk orders.",
  keywords: [
    "shea butter",
    "unrefined shea butter",
    "Nigerian shea butter",
    "natural skin care",
    "hair nourishment",
    "raw shea butter",
    "bulk shea butter",
    "Goni's Shea Butter",
  ],
  openGraph: {
    title: "Goni's Shea Butter | Pure, Unrefined Shea Butter",
    description:
      "Premium unrefined shea butter sourced directly from Northern Nigeria.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("goni_cart");
  let initialCart: CartItem[] = [];

  if (cartCookie?.value) {
    try {
      initialCart = JSON.parse(decodeURIComponent(cartCookie.value));
    } catch (e) {
      console.warn("Failed to parse cart cookie:", e);
    }
  }

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider initialCart={initialCart}>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

