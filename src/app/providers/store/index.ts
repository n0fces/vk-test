import { action, makeObservable, observable } from 'mobx';

import { getTitles } from '@/widgets/ListItems';

import { getQueryParams } from '@/shared/helpers/getQueryParams/getQueryParams';
import { ListItemProps, ListItemsReq } from '@/shared/types';

type State = 'pending' | 'done' | 'error';

class ObservableMoviesStore {
	movies: ListItemProps[] = [];
	state: State = 'done';
	error = '';
	currentPage = 1;
	totalPage = 1;

	constructor() {
		makeObservable(this, {
			movies: observable,
			state: observable,
			error: observable,
			currentPage: observable,
			totalPage: observable,
			fetchMovies: action,
			addMovies: action,
			removeMovie: action,
			changeDescriptionMovie: action,
			setError: action,
		});
	}

	fetchMovies = (page?: number) => {
		if (this.state === 'pending') return;
		this.currentPage = page ?? this.currentPage;
		if (this.totalPage === 0 || this.totalPage >= this.currentPage) {
			this.state = 'pending';
			const params = getQueryParams({});
			const objParams = params
				.slice(1)
				.split('&')
				.reduce((acc, item) => {
					const [key, value] = item.split('=');
					const decodedString = decodeURIComponent(value);
					return { ...acc, [key]: decodedString };
				}, {});

			getTitles(this.currentPage, objParams).then(
				this.addMovies,
				this.setError,
			);
		}
	};

	addMovies = (data: ListItemsReq) => {
		if (this.currentPage === 1) {
			this.movies = data.docs;
			this.totalPage = data.pages;
		} else {
			this.movies.push(...data.docs);
		}
		this.currentPage += 1;
		this.state = 'done';
	};

	removeMovie = (id: number) => {
		this.movies = this.movies.filter((movie) => movie.id !== id);
	};

	changeDescriptionMovie = (id: number, description: string) => {
		const movieIdx = this.movies.findIndex((movie) => movie.id === id);
		if (movieIdx !== -1) {
			this.movies[movieIdx].shortDescription = description;
		}
	};

	setError = (error: unknown) => {
		if (error instanceof Error) {
			this.error = error.message;
		}
	};
}

export const moviesStore = new ObservableMoviesStore();
export type ObservableMoviesStoreType = typeof moviesStore;
