import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ObservableMoviesStoreType } from '@/app/providers/store';

import { ListItems } from '../ui/ListItems/ListItems';

const mockStore = {
	movies: [
		{
			id: 1402937,
			name: 'Артур, ты король',
			alternativeName: 'Arthur the King',
			enName: null,
			year: 2024,
			shortDescription:
				'Во время экстремальной гонки Майкл находит друга — бездомного пса. Приключенческий фильм с Марком Уолбергом',
			movieLength: 107,
			poster: {
				url: 'https://image.openmoviedb.com/kinopoisk-images/10809116/02f5c9fa-8ed2-455b-9861-1a01252d73f4/orig',
				previewUrl:
					'https://image.openmoviedb.com/kinopoisk-images/10809116/02f5c9fa-8ed2-455b-9861-1a01252d73f4/x1000',
			},
			genres: [
				{
					name: 'драма',
				},
				{
					name: 'приключения',
				},
				{
					name: 'спорт',
				},
			],
			countries: [
				{
					name: 'США',
				},
				{
					name: 'Канада',
				},
			],
			persons: [
				{
					id: 21038,
					photo:
						'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_21038.jpg',
					name: 'Марк Уолберг',
					enName: 'Mark Wahlberg',
					description: 'Michael',
					profession: 'актеры',
					enProfession: 'actor',
				},
				{
					id: 2893931,
					photo:
						'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2893931.jpg',
					name: 'Симу Лю',
					enName: 'Simu Liu',
					description: 'Leo',
					profession: 'актеры',
					enProfession: 'actor',
				},
			],
		},
		{
			id: 5638367,
			name: 'Синяя тюрьма: Блю Лок — Эпизод Наги',
			alternativeName: 'Blue Lock: Episode Nagi',
			enName: null,
			year: 2024,
			shortDescription:
				'Школьник соревнуется со звездами футбола за место в сборной. Полнометражное дополнение к дерзкому аниме',
			movieLength: 91,
			seriesLength: null,
			poster: {
				url: 'https://image.openmoviedb.com/kinopoisk-images/10809116/4bde1eb3-e811-42cd-948c-bea2e079687a/orig',
				previewUrl:
					'https://image.openmoviedb.com/kinopoisk-images/10809116/4bde1eb3-e811-42cd-948c-bea2e079687a/x1000',
			},
			genres: [
				{
					name: 'аниме',
				},
				{
					name: 'мультфильм',
				},
				{
					name: 'драма',
				},
				{
					name: 'спорт',
				},
			],
			countries: [
				{
					name: 'Япония',
				},
			],
			persons: [
				{
					id: 2812099,
					photo:
						'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_2812099.jpg',
					name: 'Нобунага Симадзаки',
					enName: 'Nobunaga Shimazaki',
					description: 'Seishiro Nagi',
					profession: 'актеры',
					enProfession: 'actor',
				},
				{
					id: 3915875,
					photo:
						'https://image.openmoviedb.com/kinopoisk-st-images//actor_iphone/iphone360_3915875.jpg',
					name: 'Юма Утида',
					enName: 'Yuma Uchida',
					description: 'Reo Mikage',
					profession: 'актеры',
					enProfession: 'actor',
				},
			],
		},
		// Добавьте больше фильмов для проверки бесконечной прокрутки
	],
	state: 'done',
	error: '',
	currentPage: 1,
	totalPage: 1,
	fetchMovies: vi.fn(),
	addMovies: vi.fn(),
	removeMovie: vi.fn(),
	changeDescriptionMovie: vi.fn(),
	setError: vi.fn(),
} as ObservableMoviesStoreType;

const loadingStore = {
	...mockStore,
	state: 'pending',
} as ObservableMoviesStoreType;

const emptyStore = {
	...mockStore,
	movies: [],
	totalPage: 0,
} as ObservableMoviesStoreType;

const errorStore = {
	...mockStore,
	error: 'Произошло что-то плохое',
} as ObservableMoviesStoreType;

const ResizeObserverMock = vi.fn(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

const IntersectionObserver = vi.fn(() => ({
	observe: () => null,
	unobserve: () => null,
	disconnect: () => null,
}));
vi.stubGlobal('IntersectionObserver', IntersectionObserver);

describe('ListItems component', () => {
	it('should return rendered list of movies', () => {
		render(<ListItems store={mockStore} />);
		const first = screen.getByText('Артур, ты король');
		const second = screen.getByText('Синяя тюрьма: Блю Лок — Эпизод Наги');
		expect(first).toBeInTheDocument();
		expect(second).toBeInTheDocument();
	});

	it('should return skeleton list', () => {
		render(<ListItems store={loadingStore} />);
		expect(screen.getByTestId('SkeletonList')).toBeInTheDocument();
	});

	it('should return NothingWasFound for empty response', () => {
		render(<ListItems store={emptyStore} />);
		expect(screen.getByTestId('NothingWasFound')).toBeInTheDocument();
	});

	it('should return ErrorMessage for some error', () => {
		render(<ListItems store={errorStore} />);
		expect(screen.getByTestId('ErrorMessage')).toBeInTheDocument();
	});
});
