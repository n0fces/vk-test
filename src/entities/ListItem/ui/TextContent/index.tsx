import { Flex, Heading, Text } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';

import { stringWithDelimiter } from '@/shared/helpers/stringWithDelimiter/stringWithDelimiter';

import { ListItemCardProps } from '../ListItemCard';
import styles from './styles.module.css';

type TextContentProps = Omit<
	ListItemCardProps,
	'removeItemBtn' | 'changeDescription'
>;

export const TextContent = observer(({ movie }: TextContentProps) => {
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
		persons?.find((person) => person.profession === 'режиссеры')?.name ?? null;
	const cast = persons
		?.filter((person) => person.profession === 'актеры')
		.map((person) => person.name)
		.slice(0, 2);
	const length = movieLength ? `${movieLength} мин.` : null;

	return (
		<Flex
			gapY={'1'}
			direction={'column'}
			align={'start'}
			className={styles.cnt}>
			{title && (
				<Heading size={'3'} as="h2" className={styles.heading}>
					{title}
				</Heading>
			)}
			{(secondaryTitle || timestamp || length) && (
				<Text size={'2'} as="div" className={styles.text}>
					{stringWithDelimiter(', ', [secondaryTitle, timestamp, length])}
				</Text>
			)}
			{(country || genre || director || cast) && (
				<div>
					<Text size="2" as="div" className={styles.text}>
						{country || genre ? (
							<span>{stringWithDelimiter(' • ', [country, genre])}</span>
						) : null}
						{director && (
							<span className={styles.info}>
								&nbsp;&nbsp;Режиссёр: {director}
							</span>
						)}
						{cast && (
							<div className={styles.info}>
								В ролях: {stringWithDelimiter(', ', cast)}
							</div>
						)}
					</Text>
				</div>
			)}
			<Text
				size={'2'}
				as="p"
				className={styles.text + ' ' + styles.description}>
				{movie.shortDescription}
			</Text>
		</Flex>
	);
});
