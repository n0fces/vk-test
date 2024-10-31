import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- здесь все под контролем
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Theme>
			<App />
		</Theme>
	</StrictMode>,
);
