import { describe, expect, it, vi } from 'vitest';

import { getQueryParams } from '../getQueryParams/getQueryParams';
import { getQueryParamsObj } from './getQueryParamsObj';

vi.mock('../getQueryParams/getQueryParams');

describe('getQueryParamsObj', () => {
	it('should parse query parameters into an object', () => {
		(getQueryParams as jest.Mock).mockReturnValue('?key1=value1&key2=value2');

		const result = getQueryParamsObj();

		expect(getQueryParams).toHaveBeenCalled();
		expect(result).toEqual({
			key1: 'value1',
			key2: 'value2',
		});
	});

	it('should handle URL-encoded characters', () => {
		(getQueryParams as jest.Mock).mockReturnValue(
			'?name=John%20Doe&city=New%20York',
		);

		const result = getQueryParamsObj();

		expect(getQueryParams).toHaveBeenCalled();
		expect(result).toEqual({
			name: 'John Doe',
			city: 'New York',
		});
	});

	it('should return an empty object if no query parameters are present', () => {
		(getQueryParams as jest.Mock).mockReturnValue('');

		const result = getQueryParamsObj();

		expect(getQueryParams).toHaveBeenCalled();
		expect(result).toEqual({});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});
});
