import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Appscrip-task-syedabuswaleh",
	description:
		"Browse our diverse product catalog of custom-made items for all occasions.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
