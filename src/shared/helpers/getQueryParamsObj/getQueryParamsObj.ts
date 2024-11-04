import { getQueryParams } from '../getQueryParams/getQueryParams';

/**
 * Функция для получения объекта query-параметров из текущей URL-строки
 * @returns Возвращает объект, состоящий из пар имя и значение query-параметра
 */
export const getQueryParamsObj = () => {
	const params = getQueryParams({});

	if (params === '') return {};

	const objParams = params
		.slice(1)
		.split('&')
		.reduce((acc, item) => {
			const [key, value] = item.split('=');
			const decodedString = decodeURIComponent(value);
			return { ...acc, [key]: decodedString };
		}, {});

	return objParams;
};
