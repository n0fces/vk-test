import axios, { AxiosError } from 'axios';
import qs from 'qs';

import { TimeoutRequestError } from '../errors/timeoutError';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// инстанс для работы с запросами
export const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-type': 'application/json',
		'X-API-KEY': API_KEY,
	},
	timeout: 60000,
	paramsSerializer: (params): string => {
		return qs.stringify(params, { arrayFormat: 'repeat' });
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error instanceof AxiosError) {
			// Превышен таймаут запроса
			if (error.code === 'ECONNABORTED') {
				throw new TimeoutRequestError();
			}
			// Прочие ошибки
			return Promise.reject(error);
		}
	},
);
