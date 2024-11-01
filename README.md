# Лента отображения большого списка на React

## Обзор проекта

Реализация ленты для отображения большого списка элементов с их подгрузкой по мере скролла. В целях оптимизации отображения большого количество элементов используется концепция виртуальных списков, когда в DOM отображаются только те ноды, которые находятся в зоне видимости пользователя.

---

## Скрипты проекта

- `npm run dev` - Запуск проекта в режиме разработки
- `npm run build` - Запуск production-сборки проекта
- `npm run test` - Запуск тестов
- `npm run lint:ts` - Запуск eslint для ts файлов
- `npm run lint:css` - Запуск eslint для css файлов
- `npm run prettier` - Запуск форматирования кода через prettier

---

## Конфигурация проекта

Сборка проекта осуществляется при помощи **[vite](https://vite.dev/)**. Основная конфигурация проекта выглядит следующим образом

```js
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [{ find: '@', replacement: '/src' }],
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './tests/setup.js',
	},
});
```

---

## Архитектура проекта

Данный проект построен на основе архитектурного подхода Feature-Sliced Design (FSD), который помогает лучше структурировать фронтенд-приложение для масштабируемости и удобства поддержки. Подробнее про fsd-архитектуру фронтенд приложений можно почитать в **[документации](https://feature-sliced.design/ru/)**.

---

## Данные для отображения списка элементов

Для отображения данных используется открытое API **[OpenMovieDB](https://github.com/OpenMovieDB)**. Информация о фильмах и сериалах парсится с Кинопоиска, IMDB и TMBD

---

## Стилизация

В проекте используется UI-библиотека компонентов Radix UI. При выборе библиотеки для отображения было важно:

- Размер;
- Поддержка доступности из коробки;
- Не интересовали библиотеки, которые под капотом используют tailwind;
- Гибкая настройка стилизованных компонентов (цветовые темы);
- Документация, где можно наглядно посмотреть, как будет выглядеть тот или иной компонент при разных цветовых решениях и дополнительных настройках;
- В будущем для оптимизации размера итогового бандла можно использовать данную библиотеку без готовых стилей, а брать за основу только "доступные" компоненты, которые отвечают требованиям WAI-ARIA;
- Новый опыт, до этого я никогда не использовал эту библиотеку. Использовал некоторую похожую библиотеку headlessui.

Для дополнительной стилизации компонент использовались css-модули.

---

## Поддержание качества кода

Для подддержания качества кода в проекте используются EsLint, Prettier и Stylelint.
Конфигурация EsLint соответствует 9 версии с использованием Flat Config и подключает ряд конфигураций и плагинов, чтобы проводить статический анализ кодовой базы React-проекта на TypeScript. Подробнее с конфигурацией можно ознакомиться в `eslint.config.mjs`.

Prettier необходим для форматирования кода. Помимо подключения правил, которые я предпочитаю использовать в проектах, есть подключение `@trivago/prettier-plugin-sort-imports` плагина для сортировки импортов в нужном порядке. Для форматирования svg-файлов также включены дополнительные настройки. Подробнее с конфигурацией можно ознакомиться в `prettier.config.mjs`.

Для форматирования файлов стилей используется StyleLint. В файле настройки подключаются стандартные конфигурации для работы с css-файлами, добавляется плагин `stylelint-order` для сортировки css-правил. Весь файл конфигурации `stylelint.config.mjs`.