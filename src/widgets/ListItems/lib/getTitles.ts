import { api } from '@/shared/api';
import { ListItemsReq } from '@/shared/types';

export const getTitles = async (
	page: number,
	params: Record<string, string>,
) => {
	const response = await api.get<ListItemsReq>('v1.4/movie', {
		params: {
			limit: 20,
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

	return response.data;
};
