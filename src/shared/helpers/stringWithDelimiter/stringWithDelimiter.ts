export const customFilter = <T>(x: T | undefined | null | ''): x is T =>
	x !== undefined && x !== null && x !== '';

/**
 * Функция, которая разделяет массив строк с заданным разделителем
 * @param {string} delimiter - элемент, который используется для разделения элементов массива
 * @param {(T | undefined | null | '')[] | null | undefined} arr - массив элементов, которые необходимо объединить в строку с нужным разделителем.
 * @returns Если был передан не массив, или массив нулевой длины, или массив с "неправильными" для текущей реализации значениями, то вернется null.
 * Иначе вернется строка элементов с заданным разделителем
 */
export const stringWithDelimiter = <T = string>(
	delimiter: string,
	arr: (T | undefined | null | '')[] | null | undefined,
) => {
	const filteredArr = arr?.filter(customFilter);
	if (Array.isArray(filteredArr) && filteredArr.length) {
		return filteredArr.join(delimiter);
	}
	return null;
};
