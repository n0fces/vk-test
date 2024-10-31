import { Box, Card, Flex, Skeleton } from '@radix-ui/themes';

interface SkeletonListProps {
	length?: number;
}

const SkeletonItem = () => (
	<li>
		<Card size={'2'}>
			<Flex align={'stretch'} gapX={'5'}>
				<Skeleton width={'100px'} height={'150px'} />
				<Box flexGrow={'1'}>
					<Flex gapY={'3'} direction={'column'} align={'start'}>
						<Skeleton width={'100px'} height={'24px'} />
						<Skeleton width={'125px'} height={'16px'} />
						<Skeleton width={'150px'} height={'16px'} />
						<Skeleton width={'400px'} height={'32px'} />
					</Flex>
				</Box>
			</Flex>
		</Card>
	</li>
);

export const SkeletonList = ({ length = 10 }: SkeletonListProps) => {
	return (
		<ul>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			{[...Array(length)].map((_, i) => (
				<SkeletonItem key={i} />
			))}
		</ul>
	);
};
