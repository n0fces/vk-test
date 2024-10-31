import { ScrollArea } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import { ReactElement, useRef, useState } from 'react';

// небольшое нарушение fsd, но оно контролируемо
import { ObservableMoviesStoreType } from '@/app/providers/store';

import { ChangeDescription } from '@/features/ChangeDescription';
import { RemoveItemBtn } from '@/features/RemoveItemBtn';

import { ListItem } from '@/entities/ListItem';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from '@/shared/hooks/useThrottle/useThrottle';

import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { NothingWasFound } from '../NothingWasFound/NothingWasFound';
import { SkeletonList } from '../SkeletonList';
import styles from './styles.module.css';

interface ListItemsProps {
	store: ObservableMoviesStoreType;
}

const ITEM_HEIGHT = 254;
const WINDOW_HEIGHT = document.documentElement.clientHeight;
const NODE_PADDING = 5;

export const ListItems = observer(({ store }: ListItemsProps) => {
	const triggerRef = useRef<HTMLDivElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const [scrollTop, setScrollTop] = useState(0);
	const startIndex = Math.max(
		Math.floor(scrollTop / ITEM_HEIGHT) - NODE_PADDING,
		0,
	);
	let renderedNodesCount =
		Math.floor(WINDOW_HEIGHT / ITEM_HEIGHT) + 2 * NODE_PADDING;
	renderedNodesCount = Math.min(
		store.movies.length - startIndex,
		renderedNodesCount,
	);

	const generateRows = () => {
		const items: ReactElement[] = [];
		for (let i = 0; i < renderedNodesCount; i++) {
			const index = i + startIndex;
			items.push(
				<li key={store.movies[index].id}>
					<ListItem
						movie={store.movies[index]}
						changeDescription={
							<ChangeDescription
								id={store.movies[index].id}
								description={store.movies[index].shortDescription}
								changeDescriptionMovie={store.changeDescriptionMovie}
							/>
						}
						removeItemBtn={
							<RemoveItemBtn
								id={store.movies[index].id}
								removeMovie={store.removeMovie}
							/>
						}
					/>
				</li>,
			);
		}

		return items;
	};

	useInfiniteScroll({
		wrapperRef,
		triggerRef,
		callback: store.fetchMovies,
	});

	return (
		<ScrollArea
			data-testid="ScrollArea"
			ref={wrapperRef}
			type="auto"
			size={'2'}
			scrollbars="vertical"
			style={{
				height: `${WINDOW_HEIGHT}px`,
			}}
			onScroll={useThrottle((e) => {
				setScrollTop(e.currentTarget.scrollTop);
			}, 17)}>
			<div style={{ transform: `translateY(${startIndex * ITEM_HEIGHT}px)` }}>
				<ul className={styles.list}>{generateRows()}</ul>
				<div ref={triggerRef} style={{ height: '1px' }}></div>
				{store.state === 'pending' ? <SkeletonList /> : null}
				{store.totalPage === 0 ? <NothingWasFound /> : null}
				{store.error !== '' ? <ErrorMessage error={store.error} /> : null}
			</div>
		</ScrollArea>
	);
});
