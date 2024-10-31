export const getSearchParam = (paramName: string) => {
	const params = new URLSearchParams(window.location.search);
	return params.get(paramName);
};
