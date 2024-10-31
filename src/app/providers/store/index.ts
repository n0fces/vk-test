import { action, makeObservable, observable } from 'mobx';

import { getTitles } from '@/widgets/ListItems';

import { ListItemProps } from '@/shared/types';

type State = 'pending' | 'done' | 'error';

class ObservableMoviesStore {
	movies: ListItemProps[] = [];
	state: State = 'done';
	error = '';
	currentPage = 1;

	constructor() {
		makeObservable(this, {
			movies: observable,
			state: observable,
			error: observable,
			currentPage: observable,
			fetchMovies: action,
			addMovies: action,
			removeMovie: action,
			changeDescriptionMovie: action,
			setError: action,
		});
	}

	fetchMovies = () => {
		if (this.state === 'pending') return;
		this.state = 'pending';
		getTitles(this.currentPage).then(this.addMovies, this.setError);
	};

	addMovies = (movies: ListItemProps[]) => {
		this.movies.push(...movies);
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
