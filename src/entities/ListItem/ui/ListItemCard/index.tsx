import { Box, Card, Flex } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

import { ListItemProps } from '@/shared/types';
import { Image } from '@/shared/ui/Image';

import { TextContent } from '../TextContent';

export interface ListItemCardProps {
	movie: ListItemProps;
	removeItemBtn?: ReactNode;
	changeDescription?: ReactNode;
}

export const ListItemCard = observer(
	({ removeItemBtn, changeDescription, movie }: ListItemCardProps) => {
		const { poster, name, enName, alternativeName } = movie;
		return (
			<Card size={'2'} style={{ height: '250px' }}>
				<Flex align={'stretch'} gapX={'5'}>
					<Box flexBasis={'150'}>
						<Image
							width={100}
							height={150}
							src={poster?.previewUrl}
							alt={name ?? enName ?? alternativeName}
						/>
					</Box>
					<Box flexGrow={'1'}>
						<TextContent movie={movie} changeDescription={changeDescription} />
					</Box>
					{removeItemBtn}
				</Flex>
			</Card>
		);
	},
);
