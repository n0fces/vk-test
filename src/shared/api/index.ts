import axios from 'axios';
import qs from 'qs';

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
