import { getQueryParams } from '../getQueryParams/getQueryParams';

/**
 * Функция добавления параметров строки запроса в URL
 * @param params - объект с новыми параметрами на добавление
 */
export const addQueryParams = (params: Record<string, string>) => {
	const queryString = getQueryParams(params);
	const newUrl = queryString ? queryString : window.location.pathname;

	window.history.pushState(null, '', newUrl);
};
