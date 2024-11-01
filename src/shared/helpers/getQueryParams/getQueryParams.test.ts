import { getQueryParams } from './getQueryParams';

describe('getQueryParams', () => {
	const originalLocation = window.location;

	beforeEach(() => {
		Object.defineProperty(window, 'location', {
			value: {
				search: '',
			},
			writable: true,
		});
	});

	it('should add a new parameter to an empty query string', () => {
		const prev = getQueryParams({});
		expect(prev).toBe('');
		const result = getQueryParams({ param: 'value' });
		expect(result).toBe('?param=value');
	});

	it('should update an existing parameter in the query string', () => {
		window.location.search = '?param=oldValue';
		const prev = getQueryParams({});
		expect(prev).toBe('?param=oldValue');
		const result = getQueryParams({ param: 'newValue' });
		expect(result).toBe('?param=newValue');
	});

	it('should delete the parameter if the value is "default"', () => {
		window.location.search = '?param=oldValue';
		const prev = getQueryParams({});
		expect(prev).toBe('?param=oldValue');
		const result = getQueryParams({ param: 'default' });
		expect(result).toBe('');
	});

	it('should add several parameters and updates existing ones', () => {
		window.location.search = '?param1=oldValue';
		const prev = getQueryParams({});
		expect(prev).toBe('?param1=oldValue');
		const result = getQueryParams({ param1: 'newValue', param2: 'value2' });
		expect(result).toBe('?param1=newValue&param2=value2');
	});

	it('should delete the parameter and adds a new one if one of the values is "default"', () => {
		window.location.search = '?param1=value1&param2=value2';
		const prev = getQueryParams({});
		expect(prev).toBe('?param1=value1&param2=value2');
		const result = getQueryParams({ param1: 'default', param3: 'value3' });
		expect(result).toBe('?param2=value2&param3=value3');
	});

	afterEach(() => {
		window.location = originalLocation;
	});
});
