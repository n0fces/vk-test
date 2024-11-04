import { makeAutoObservable } from 'mobx';

import { getTitles } from '@/widgets/ListItems';

import { getQueryParamsObj } from '@/shared/helpers/getQueryParamsObj/getQueryParamsObj';
import { ListItemProps, ListItemsReq } from '@/shared/types';

type State = 'pending' | 'done';

class ObservableMoviesStore {
	movies: ListItemProps[] = [];
	state: State = 'done';
	error = '';
	currentPage = 1;
	totalPage = 1;

	constructor() {
		makeAutoObservable(this);
	}

	fetchMovies = (page?: number) => {
		if (this.state === 'pending') return;
		this.currentPage = page ?? this.currentPage;
		if (this.totalPage === 0 || this.totalPage >= this.currentPage) {
			this.state = 'pending';
			if (this.currentPage === 1) {
				this.movies = [];
			}
			const objParams = getQueryParamsObj();

			getTitles(this.currentPage, objParams).then(
				this.addMovies,
				this.setError,
			);
		}
	};

	addMovies = (data: ListItemsReq) => {
		if (this.error !== '') this.error = '';
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
