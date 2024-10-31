export interface Data<T> {
	docs: T[];
	/** Общее количество результатов */
	total: number;
	/** Количество результатов на странице */
	limit: number;
	/** Текущая страница */
	page: number;
	/** Сколько страниц всего */
	pages: number;
}

export interface ExternalId {
	/**
	 * ID из kinopoisk HD
	 * @example "48e8d0acb0f62d8585101798eaeceec5"
	 */
	kpHD?: string | null;
	/** @example "tt0232500" */
	imdb?: string | null;
	/** @example 9799 */
	tmdb?: number | null;
}

export interface Name {
	name?: string;
	language?: string | null;
	type?: string | null;
}

export interface FactInMovie {
	value: string;
	type?: string | null;
	spoiler?: boolean | null;
}

export interface Rating {
	/**
	 * Рейтинг кинопоиска
	 * @example 6.2
	 */
	kp?: number | null;
	/**
	 * Рейтинг IMDB
	 * @example 8.4
	 */
	imdb?: number | null;
	/**
	 * Рейтинг TMDB
	 * @example 3.2
	 */
	tmdb?: number | null;
	/**
	 * Рейтинг кинокритиков
	 * @example 10
	 */
	filmCritics?: number | null;
	/**
	 * Рейтинг кинокритиков из РФ
	 * @example 5.1
	 */
	russianFilmCritics?: number | null;
	/**
	 * Рейтинг основанный на ожиданиях пользователей
	 * @example 6.1
	 */
	await?: number | null;
}

export interface Votes {
	/** @example 60000 */
	kp?: string | null;
	/** @example 50000 */
	imdb?: number | null;
	/** @example 10000 */
	tmdb?: number | null;
	/**
	 * Количество голосов кинокритиков
	 * @example 10000
	 */
	filmCritics?: number | null;
	/**
	 * Количество голосов кинокритиков из РФ
	 * @example 4000
	 */
	russianFilmCritics?: number | null;
	/**
	 * Количество ожидающих выхода
	 * @example 34000
	 */
	await?: number | null;
}

export interface Logo {
	/** Чтобы найти фильмы с этим полем, используйте: `!null` */
	url?: string | null;
}

export interface ShortImage {
	/** Чтобы найти фильмы с этим полем, используйте: `!null` */
	url?: string | null;
	/** Чтобы найти фильмы с этим полем, используйте: `!null` */
	previewUrl?: string | null;
}

export interface Video {
	/**
	 * Url трейлера
	 * @example "https://www.youtube.com/embed/ZsJz2TJAPjw"
	 */
	url?: string | null;
	/** @example "Official Trailer" */
	name?: string | null;
	/** @example "youtube" */
	site?: string | null;
	size?: number | null;
	/** @example "TRAILER" */
	type?: string | null;
}

export interface VideoTypes {
	trailers?: Video[] | null;
}

export interface ItemName {
	name?: string;
}

export interface PersonInMovie {
	/**
	 * Id персоны с кинопоиска
	 * @example 6317
	 */
	id: number;
	/** @example "https://st.kp.yandex.net/images/actor_iphone/iphone360_6317.jpg" */
	photo?: string | null;
	/** @example "Пол Уокер" */
	name?: string | null;
	/** @example "Paul Walker" */
	enName?: string | null;
	description?: string | null;
	profession?: string | null;
	enProfession?: string | null;
}

export interface ReviewInfo {
	count?: number | null;
	positiveCount?: number | null;
	percentage?: string | null;
}

export interface SeasonInfo {
	number?: number | null;
	episodesCount?: number | null;
}

export interface CurrencyValue {
	/**
	 * Сумма
	 * @example 207283
	 */
	value?: number | null;
	/**
	 * Валюта
	 * @example "€"
	 */
	currency?: string | null;
}

export interface Fees {
	world?: CurrencyValue;
	russia?: CurrencyValue;
	usa?: CurrencyValue;
}

export interface Premiere {
	/** @example "США" */
	country?: string | null;
	/**
	 * Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023
	 * @format date-time
	 * @example "2023-02-25T02:44:39.359Z"
	 */
	world?: string | null;
	/**
	 * Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023
	 * @format date-time
	 * @example "2023-02-25T02:44:39.359Z"
	 */
	russia?: string | null;
	digital?: string | null;
	/**
	 * Для более релевантного поиска, используйте интервал дат 01.02.2022-01.02.2023
	 * @format date-time
	 * @example "2023-02-25T02:44:39.359Z"
	 */
	cinema?: string | null;
	bluray?: string | null;
	dvd?: string | null;
}

export interface LinkedMovie {
	id: number;
	name?: string | null;
	enName?: string | null;
	alternativeName?: string | null;
	type?: string | null;
	poster?: ShortImage | null;
	rating?: Rating | null;
	/** @example 2021 */
	year?: number | null;
}

export interface WatchabilityItem {
	name?: string | null;
	logo: Logo;
	url: string;
}

export interface Watchability {
	items?: WatchabilityItem[];
}

export interface YearRange {
	/**
	 * Год начала
	 * @example 2022
	 */
	start?: number | null;
	/**
	 * Год окончания
	 * @example 2023
	 */
	end?: number | null;
}

export interface Audience {
	/**
	 * Количество просмотров в кино
	 * @example 1000
	 */
	count?: number | null;
	/**
	 * Страна в которой проходил показ
	 * @example "Россия"
	 */
	country?: string | null;
}

export interface NetworkItem {
	/** @example "Netflix" */
	name?: string | null;
	logo?: Logo | null;
}

export interface Networks {
	items?: NetworkItem[] | null;
}

export interface Movie {
	/**
	 * Id фильма с кинопоиска
	 * @example 666
	 */
	id?: number | null;
	externalId?: ExternalId | null;
	/** @example "Человек паук" */
	name?: string | null;
	/** @example "Spider man" */
	alternativeName?: string | null;
	/** @example "Spider man" */
	enName?: string | null;
	names?: Name[] | null;
	/**
	 * Тип тайтла. Доступны: movie | tv-series | cartoon | anime | animated-series | tv-show
	 * @example "movie"
	 */
	type?: string | null;
	/**
	 * Тип тайтла в числовом обозначении. Доступны: 1 (movie) | 2 (tv-series) | 3 (cartoon) | 4 (anime) | 5 (animated-series) | 6 (tv-show)
	 * @example 1
	 */
	typeNumber?: number | null;
	/**
	 * Год премьеры. При поиске по этому полю, можно использовать интервалы 1860-2030
	 * @example 2023
	 */
	year?: number | null;
	/** Описание тайтла */
	description?: string | null;
	/** Сокращенное описание */
	shortDescription?: string | null;
	/** Слоган */
	slogan?: string | null;
	/**
	 * Статус релиза тайтла. Доступные значения: filming | pre-production | completed | announced | post-production
	 * @example "completed"
	 */
	status?: string | null;
	facts?: FactInMovie[] | null;
	rating?: Rating;
	votes?: Votes;
	/**
	 * Продолжительность фильма
	 * @example 120
	 */
	movieLength?: number | null;
	/**
	 * Возрастной рейтинг по MPAA
	 * @example "pg13"
	 */
	ratingMpaa?: string | null;
	/**
	 * Возрастной рейтинг
	 * @example "16"
	 */
	ageRating?: number | null;
	logo?: Logo;
	poster?: ShortImage;
	backdrop?: ShortImage;
	videos?: VideoTypes;
	genres?: ItemName[];
	countries?: ItemName[];
	persons?: PersonInMovie[];
	reviewInfo?: ReviewInfo;
	seasonsInfo?: SeasonInfo[];
	budget?: CurrencyValue;
	fees?: Fees;
	premiere?: Premiere;
	similarMovies?: LinkedMovie[] | null;
	sequelsAndPrequels?: LinkedMovie[] | null;
	watchability?: Watchability;
	releaseYears?: YearRange[];
	/**
	 * Позиция тайтла в топ 10. Чтобы найти фильмы участвующие в рейтинге используйте: `!null`
	 * @example 1
	 */
	top10?: number | null;
	/**
	 * Позиция тайтла в топ 250. Чтобы найти фильмы участвующие в рейтинге используйте: `!null`
	 * @example 200
	 */
	top250?: number | null;
	/**
	 * Признак того, что тайтл находится в прокате
	 * @example true
	 */
	ticketsOnSale?: boolean | null;
	/**
	 * Продолжительность всех серий
	 * @example 155
	 */
	totalSeriesLength?: number | null;
	/**
	 * Средняя продолжительность серии
	 * @example 20
	 */
	seriesLength?: number | null;
	/**
	 * Признак сериала
	 * @example true
	 */
	isSeries?: boolean | null;
	audience?: Audience[] | null;
	/**
	 * Список коллекций, в которых находится тайтл.
	 * @example ["250 лучших сериалов"]
	 */
	lists?: string[] | null;
	networks?: Networks | null;
	/** @format date-time */
	updatedAt?: string | null;
	/** @format date-time */
	createdAt?: string | null;
}

export interface ErrorResponseDto {
	statusCode: number;
	message: string;
	error: string;
}

export interface ListItemProps
	extends Pick<
		Movie,
		| 'poster'
		| 'name'
		| 'enName'
		| 'alternativeName'
		| 'year'
		| 'movieLength'
		| 'countries'
		| 'genres'
		| 'persons'
	> {
	id: number;
	shortDescription: string;
}

export type ListItemsReq = Data<ListItemProps>;
