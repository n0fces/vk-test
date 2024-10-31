import { api } from '@/shared/api';
import { ListItemsReq } from '@/shared/types';

export const getTitles = async (
	page: number,
	params: Record<string, string>,
) => {
	const { data, status } = await api.get<ListItemsReq>('v1.4/movie', {
		params: {
			lists: 'popular-films',
			notNullFields: ['id', 'shortDescription'],
			selectFields: [
				'id',
				'poster',
				'name',
				'enName',
				'alternativeName',
				'year',
				'releaseYears',
				'movieLength',
				'seriesLength',
				'countries',
				'genres',
				'persons',
				'shortDescription',
			],
			page,
			...params,
		},
	});

	if (status !== 200) {
		throw new Error('Failed to fetch data');
	}

	return data;
};
