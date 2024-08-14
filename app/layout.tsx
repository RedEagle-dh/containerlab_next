import '@/styles/globals.css';
import { Metadata } from 'next';
import { ThemeProvider } from './providers';
import ShadNavbar from './components/navbars/ShadNavbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
	title: {
		default: 'CLab Sandbox',
		template: `%s - CLab Sandbox`,
	},
	description: 'A sandbox for testing CLab',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head />
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					forcedTheme='light'
					disableTransitionOnChange
				>
					<ShadNavbar>
						{children}
						<Toaster />
					</ShadNavbar>
				</ThemeProvider>
			</body>
		</html>
	);
}
