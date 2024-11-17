import { useEffect, useState } from 'react';

export const useAvaibleHeight = () => {
	const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

	useEffect(() => {
		const updateAvailableHeight = () => {
			const filterPanelHeight =
				document.getElementById('filterPanel')?.offsetHeight || 0;

			const height =
				window.innerWidth > 768
					? window.innerHeight - 20
					: window.innerHeight - filterPanelHeight - 20 - 24;
			setAvailableHeight(height);
		};

		window.addEventListener('resize', updateAvailableHeight);
		updateAvailableHeight();

		return () => {
			window.removeEventListener('resize', updateAvailableHeight);
		};
	}, []);

	return availableHeight;
};
