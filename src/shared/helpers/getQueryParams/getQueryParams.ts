/**
 * Функция для создания строки с обновленными параметрами запроса
 * @param params - объект с новыми параметрами на добавление
 */
export const getQueryParams = (params: OptionalRecord<string, string>) => {
	// получаем объект с уже существующими полями
	const searchParams = new URLSearchParams(window.location.search);
	// пробегаемся, которые мы приняли аргументом в этой функции и добавляем к уже существующим searchParams
	Object.entries(params).forEach(([name, value]) => {
		if (value && value !== 'default') {
			searchParams.set(name, value);
		}
	});
	return `?${searchParams.toString()}`;
};
