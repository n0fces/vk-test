import { useCallback } from 'react';

import { addQueryParams } from '@/shared/helpers/addQueryParams/addQueryParams';
import { getQueryParam } from '@/shared/helpers/getQueryParam/getQueryParam';
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
			defaultValue={getQueryParam('countries.name') ?? 'default'}
		/>
	);
};
