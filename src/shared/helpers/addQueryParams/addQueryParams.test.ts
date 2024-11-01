/* eslint-disable @typescript-eslint/unbound-method */
import { vi } from 'vitest';

import { getQueryParams } from '../getQueryParams/getQueryParams';
import { addQueryParams } from './addQueryParams';

vi.mock('../getQueryParams/getQueryParams');

describe('addQueryParams', () => {
	beforeAll(() => {
		vi.spyOn(window.history, 'pushState').mockImplementation(vi.fn());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should add query parameters to the URL', () => {
		const params = { search: 'test', page: '1' };
		const queryString = '?search=test&page=1';

		(getQueryParams as jest.Mock).mockReturnValue(queryString);

		addQueryParams(params);

		expect(getQueryParams).toHaveBeenCalledWith(params);
		expect(window.history.pushState).toHaveBeenCalledWith(
			null,
			'',
			queryString,
		);
	});

	it('should use pathname if no query string is generated', () => {
		const params = {};

		(getQueryParams as jest.Mock).mockReturnValue('');

		Object.defineProperty(window, 'location', {
			value: {
				pathname: '/pathname',
			},
			writable: true,
		});

		addQueryParams(params);

		expect(getQueryParams).toHaveBeenCalledWith(params);
		expect(window.history.pushState).toHaveBeenCalledWith(
			null,
			'',
			'/pathname',
		);
	});
});
