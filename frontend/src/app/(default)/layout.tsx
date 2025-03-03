import Header from "../components/Header";
import { LoginProvider } from "../contexts/login";

export default function DefaultLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LoginProvider>
			<Header />
			{children}
		</LoginProvider>
	);
}
