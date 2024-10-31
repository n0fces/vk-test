import { useCallback } from 'react';

import { addQueryParams } from '@/shared/helpers/addQueryParams/addQueryParams';
import { getSearchParam } from '@/shared/helpers/getSearchParam/getSearchParam';
import { Select } from '@/shared/ui/Select';

import { countries } from '../constants/countries';

interface SelectCountryProps {
	refetch: (page?: number) => void;
}

export const SelectCountry = ({ refetch }: SelectCountryProps) => {
	const setCountry = useCallback(
		(value: string) => {
			addQueryParams({ 'countries.name': value });
			refetch(1);
		},
		[refetch],
	);

	return (
		<Select
			options={countries}
			callback={setCountry}
			defaultValue={getSearchParam('countries.name') ?? 'default'}
		/>
	);
};
