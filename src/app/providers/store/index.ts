import { makeAutoObservable, runInAction } from 'mobx';

import { getTitles } from '@/widgets/ListItems';

import { AbortRequest } from '@/shared/errors/abortRequest';
import { getQueryParamsObj } from '@/shared/helpers/getQueryParamsObj/getQueryParamsObj';
import { customFilter } from '@/shared/helpers/stringWithDelimiter/stringWithDelimiter';
import { ListItemProps, ListItemsReq } from '@/shared/types';

type State = 'pending' | 'done';

interface MovieChanges {
	descriptionChanged?: string;
	removed?: boolean;
}

type MovieChangesMap<T, U> = Map<T, U>;

class ObservableMoviesStore {
	movies: ListItemProps[] = [];
	state: State = 'done';
	error = '';
	currentPage = 1;
	totalPage = 1;
	movieChanges: MovieChangesMap<number, MovieChanges> = new Map();
	abortController: AbortController | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	fetchMovies = (page?: number) => {
		if (this.state === 'pending') {
			this.cancelFetch();
		}
		this.currentPage = page ?? this.currentPage;
		const isFetchingWithNewQueries = page === 1;
		if (isFetchingWithNewQueries || this.totalPage >= this.currentPage) {
			this.state = 'pending';

			if (isFetchingWithNewQueries) {
				this.movies = [];
			}

			this.abortController = new AbortController();
			const { signal } = this.abortController;

			const objParams = getQueryParamsObj();
			getTitles(this.currentPage, objParams, signal)
				.then(this.addMovies)
				.catch(this.setError)
				.finally(() => {
					runInAction(() => {
						this.abortController = null;
					});
				});
		}
	};

	cancelFetch = () => {
		if (this.abortController) {
			this.abortController.abort();
		}
	};

	addMovies = (data: ListItemsReq) => {
		if (this.error !== '') this.error = '';

		const updateMovies = data.docs
			.map((movie) => {
				const changes = this.movieChanges.get(movie.id);
				if (changes?.removed) {
					return null;
				}
				if (changes?.descriptionChanged) {
					movie.shortDescription = changes.descriptionChanged;
				}
				return movie;
			})
			.filter(customFilter);

		if (this.currentPage === 1) {
			this.movies = updateMovies;
			this.totalPage = data.pages;
		} else {
			this.movies.push(...updateMovies);
		}
		this.state = 'done';
		this.currentPage += 1;
	};

	removeMovie = (id: number) => {
		this.movies = this.movies.filter((movie) => movie.id !== id);

		const currentChanges = this.movieChanges.get(id) || {};
		this.movieChanges.set(id, { ...currentChanges, removed: true });
	};

	changeDescriptionMovie = (id: number, description: string) => {
		const movieIdx = this.movies.findIndex((movie) => movie.id === id);
		if (movieIdx !== -1) {
			this.movies[movieIdx].shortDescription = description;

			const currentChanges = this.movieChanges.get(id) || {};
			this.movieChanges.set(id, {
				...currentChanges,
				descriptionChanged: description,
			});
		}
	};

	setError = (error: unknown) => {
		const isAborted = error instanceof AbortRequest;
		if (!isAborted && error instanceof Error) {
			this.error = error.message;
			this.state = 'done';
		}
	};
}

export const moviesStore = new ObservableMoviesStore();
export type ObservableMoviesStoreType = typeof moviesStore;
