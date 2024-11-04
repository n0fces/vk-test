/**
 * Функция получения значения для конкретного параметра из строки запроса
 * @param {string} paramName - название параметра, для которого нужно получить значение
 * @returns значение конкретного параметра из строки запроса
 */
export const getQueryParam = (paramName: string) => {
	const params = new URLSearchParams(window.location.search);
	return params.get(paramName);
};
