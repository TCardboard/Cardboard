import "./globals.css";

import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { TanstackClientProvider } from "@/libs/tanstack";
import { RoutingDevTools } from "@/utils/devtools/DevToolsProvider";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${manrope.className} ${geistMono.variable} antialiased`}
			>
				{process.env.NODE_ENV === "development" && <RoutingDevTools />}
				<TanstackClientProvider>{children}</TanstackClientProvider>
			</body>
		</html>
	);
}
