import { stringWithDelimiter } from './stringWithDelimiter';

describe('stringWithDelimiter', () => {
	test('should return null for empty array', () => {
		expect(stringWithDelimiter(',', [])).toBeNull();
	});

	test('should return null for null array', () => {
		expect(stringWithDelimiter(',', null)).toBeNull();
	});

	test('should return null for undefined array', () => {
		expect(stringWithDelimiter(',', undefined)).toBeNull();
	});

	test('should return null for array with empty strings', () => {
		expect(stringWithDelimiter(',', ['', ''])).toBeNull();
	});

	test('should return null for array with null values', () => {
		expect(stringWithDelimiter(',', [null, null])).toBeNull();
	});

	test('should return null for array with undefined values', () => {
		expect(stringWithDelimiter(',', [undefined, undefined])).toBeNull();
	});

	test('should return only one correct value without delimiter', () => {
		expect(stringWithDelimiter(',', ['str', undefined, null, ''])).toBe('str');
	});

	test('should return correct string with delimiter (original data is plenty of strings)', () => {
		expect(stringWithDelimiter(', ', ['str1', 'str2', 'str3'])).toBe(
			'str1, str2, str3',
		);
	});

	test('should return correct string with delimiter (original data is plenty of miscellaneous stuff', () => {
		expect(stringWithDelimiter(', ', ['str1', 5, true])).toBe('str1, 5, true');
	});
});
