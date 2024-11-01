import { getSearchParam } from './getSearchParam';

describe('getSearchParam', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			value: {
				search: '?search=test&page=1',
			},
			writable: true,
		});
	});

	it('should return the value of the specified search parameter', () => {
		const result = getSearchParam('search');
		expect(result).toBe('test');
	});

	it('should return null for a non-existing search parameter', () => {
		const result = getSearchParam('something');
		expect(result).toBeNull();
	});

	it('should return the value of another existed search parameter', () => {
		const result = getSearchParam('page');
		expect(result).toBe('1');
	});
});
