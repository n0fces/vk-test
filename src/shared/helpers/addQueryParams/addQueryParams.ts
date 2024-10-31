import { getQueryParams } from '../getQueryParams/getQueryParams';

/**
 * Функция добавления параметров строки запроса в URL
 * @param params - объект с новыми параметрами на добавление
 */
export const addQueryParams = (params: Record<string, string>) => {
	// в конце концов, мы обновленный объект с параметрами пушим в адресную строку
	window.history.pushState(null, '', getQueryParams(params));
};
