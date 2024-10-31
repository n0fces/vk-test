import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

// небольшое нарушение fsd, но оно контролируемо
import { ObservableMoviesStoreType } from '@/app/providers/store';

import { ChangeDescription } from '@/features/ChangeDescription';
import { RemoveItemBtn } from '@/features/RemoveItemBtn';

import { ListItem } from '@/entities/ListItem';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll/useInfiniteScroll';

import { SkeletonList } from '../SkeletonList';
import styles from './styles.module.css';

interface ListItemsProps {
	store: ObservableMoviesStoreType;
}

export const ListItems = observer(({ store }: ListItemsProps) => {
	const triggerRef = useRef<HTMLDivElement | null>(null);

	useInfiniteScroll({
		wrapperRef: undefined,
		triggerRef,
		callback: store.fetchMovies,
	});

	return (
		<>
			<ul className={styles.list}>
				{store.movies.map((movie) => (
					<li key={movie.id}>
						<ListItem
							movie={movie}
							changeDescription={
								<ChangeDescription
									id={movie.id}
									description={movie.shortDescription}
									changeDescriptionMovie={store.changeDescriptionMovie}
								/>
							}
							removeItemBtn={
								<RemoveItemBtn id={movie.id} removeMovie={store.removeMovie} />
							}
						/>
					</li>
				))}
			</ul>
			<div ref={triggerRef}></div>
			{store.state === 'pending' ? <SkeletonList /> : null}
		</>
	);
});
