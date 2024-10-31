import { useCallback } from 'react';

import { addQueryParams } from '@/shared/helpers/addQueryParams/addQueryParams';
import { getSearchParam } from '@/shared/helpers/getSearchParam/getSearchParam';
import { Select } from '@/shared/ui/Select';

import { years } from '../constants/years';

interface SelectYearsProps {
	refetch: (page?: number) => void;
}

export const SelectYears = ({ refetch }: SelectYearsProps) => {
	const setCountry = useCallback(
		(value: string) => {
			addQueryParams({ year: value });
			refetch(1);
		},
		[refetch],
	);

	return (
		<Select
			options={years}
			callback={setCountry}
			defaultValue={getSearchParam('year') ?? 'default'}
		/>
	);
};
