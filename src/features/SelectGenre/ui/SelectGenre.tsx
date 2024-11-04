import { useCallback } from 'react';

import { addQueryParams } from '@/shared/helpers/addQueryParams/addQueryParams';
import { getQueryParam } from '@/shared/helpers/getQueryParam/getQueryParam';
import { Select } from '@/shared/ui/Select';

import { genres } from '../constants/genres';

interface SelectGenreProps {
	refetch: (page?: number) => void;
}

export const SelectGenre = ({ refetch }: SelectGenreProps) => {
	const setCountry = useCallback(
		(value: string) => {
			addQueryParams({ 'genres.name': value });
			refetch(1);
		},
		[refetch],
	);

	return (
		<Select
			options={genres}
			callback={setCountry}
			defaultValue={getQueryParam('genres.name') ?? 'default'}
		/>
	);
};
