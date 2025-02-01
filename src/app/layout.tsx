import type { Metadata } from 'next';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';

import SessionProviderWrapper from './components/SessionProviderWrapper';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
	variable: '--font-roboto-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'FitTrackPro',
	description: 'Your ultimate fitness tracker!',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='bg-gray-100 text-gray-900 flex flex-col min-h-screen'>
				<SessionProviderWrapper>
					<NavBar />
					<main className='flex-grow container mx-auto p-4'>{children}</main>
					<Footer />
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
