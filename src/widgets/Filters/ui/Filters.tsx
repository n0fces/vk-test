import { Card, Flex } from '@radix-ui/themes';

// ! отход от fsd, но это контролируемо
import { ObservableMoviesStoreType } from '@/app/providers/store';

import { SelectCountry } from '@/features/SelectCountry';
import { SelectGenre } from '@/features/SelectGenre';
import { SelectYears } from '@/features/SelectYears';

import styles from './styles.module.css';

interface FiltersProps {
	store: ObservableMoviesStoreType;
}

export const Filters = ({ store }: FiltersProps) => {
	return (
		<Card className={styles.card}>
			<Flex direction={'column'} gap={'2'}>
				<SelectCountry refetch={store.fetchMovies} />
				<SelectGenre refetch={store.fetchMovies} />
				<SelectYears refetch={store.fetchMovies} />
			</Flex>
		</Card>
	);
};
