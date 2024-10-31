import { api } from '@/shared/api';
import { ListItemsReq } from '@/shared/types';

export const getTitles = async (page: number) => {
	const { data, status } = await api.get<ListItemsReq>('v1.4/movie', {
		params: {
			lists: 'popular-films',
			notNullFields: ['id', 'shortDescription'],
			page,
		},
	});

	if (status !== 200) {
		throw new Error('Failed to fetch data');
	}

	return data.docs;
};
