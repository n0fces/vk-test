import { Box, Card, Flex, Skeleton } from '@radix-ui/themes';

import styles from './styles.module.css';

interface SkeletonListProps {
	length?: number;
}

const SkeletonItem = () => (
	<li>
		<Card size={'2'}>
			<Flex align={'stretch'} gapX={'3'} className={styles.item}>
				<Skeleton width={'72px'} height={'108px'} />
				<Box flexGrow={'1'}>
					<Flex gapY={'3'} direction={'column'} align={'start'}>
						<Skeleton maxWidth={'100px'} width={'100%'} height={'20px'} />
						<Skeleton maxWidth={'125px'} width={'100%'} height={'16px'} />
						<Skeleton maxWidth={'150px'} width={'100%'} height={'16px'} />
						<Skeleton maxWidth={'400px'} width={'100%'} height={'32px'} />
					</Flex>
				</Box>
			</Flex>
		</Card>
	</li>
);

export const SkeletonList = ({ length = 10 }: SkeletonListProps) => {
	return (
		<ul data-testid="SkeletonList" className={styles.list}>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			{[...Array(length)].map((_, i) => (
				<SkeletonItem key={i} />
			))}
		</ul>
	);
};
