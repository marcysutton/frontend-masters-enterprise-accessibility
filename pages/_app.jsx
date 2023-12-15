import '../styles.css';
import 'nextra-theme-docs/style.css';
import '../custom.css';
import { SSRProvider } from '@react-aria/ssr';
import '../components/reorderable-list.scss';
import '../components/portal-switcher.scss';

// Shim requestIdleCallback in Safari
if (typeof window !== 'undefined' && !('requestIdleCallback' in window)) {
	window.requestIdleCallback = (fn) => setTimeout(fn, 1);
	window.cancelIdleCallback = (e) => clearTimeout(e);
}

export default function Nextra({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);

	return getLayout(
		<SSRProvider>
			<Component {...pageProps} />
		</SSRProvider>
	);
}
