import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { env } from "@/env"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Next.js Boilerplate",
    template: "%s | Next.js Boilerplate",
  },
  description: "A comprehensive Next.js boilerplate with modern tooling",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Next.js Boilerplate",
    description: "A comprehensive Next.js boilerplate with modern tooling",
    siteName: "Next.js Boilerplate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Boilerplate",
    description: "A comprehensive Next.js boilerplate with modern tooling",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      signUpUrl={env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      afterSignInUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      afterSignUpUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
