import { Flex, Heading, Text } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';

import { stringWithDelimiter } from '@/shared/helpers/stringWithDelimiter/stringWithDelimiter';

import { ListItemCardProps } from '../ListItemCard';

type TextContentProps = Omit<ListItemCardProps, 'removeItemBtn'>;

export const TextContent = observer(
	({ movie, changeDescription }: TextContentProps) => {
		const {
			name,
			alternativeName,
			enName,
			year,
			countries,
			genres,
			movieLength,
			persons,
		} = movie;
		const title = name ?? alternativeName ?? enName;
		const secondaryTitle = alternativeName ?? enName;
		const timestamp = year;
		const country = countries?.length ? countries[0].name : null;
		const genre = genres?.length ? genres[0].name : null;
		const director =
			persons?.find((person) => person.profession === 'режиссеры')?.name ??
			null;
		const cast = persons
			?.filter((person) => person.profession === 'актеры')
			.map((person) => person.name)
			.slice(0, 2);
		const length = movieLength ? `${movieLength} мин.` : null;

		return (
			<Flex gapY={'3'} direction={'column'} align={'start'}>
				<Heading as="h2">{title}</Heading>
				<div>
					{stringWithDelimiter(', ', [secondaryTitle, timestamp, length])}
				</div>
				<div>
					<div>
						{country && genre && (
							<span>{stringWithDelimiter(' • ', [country, genre])}</span>
						)}
						{director && <span>&nbsp;&nbsp;Режиссёр: {director}</span>}
					</div>
					<div>{stringWithDelimiter(', ', cast)}</div>
				</div>
				<Text as="p">{movie.shortDescription}</Text>
				{changeDescription}
			</Flex>
		);
	},
);
