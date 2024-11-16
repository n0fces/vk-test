import { RefObject, useEffect, useRef } from 'react';

interface useInfiniteScrollProps {
	callback?: () => void;
	triggerRef: RefObject<HTMLElement>;
	wrapperRef?: RefObject<HTMLElement>;
}

/**
 * Кастомный хук для реализации выполнения переданного колбэка при срабатывании триггера в Intersection Observer API
 * (в частности, для реализации бесконечной ленты с подгрузкой)
 * @param {Object} useInfiniteScrollProps - Объект принимаемых аргументов
 * @param {Function} params.callback - функция, которая будет вызываться при срабатывании обсервера
 * @param {React.RefObject<HTMLElement>} params.triggerRef - компонент, на который будем триггериться
 * @param {React.RefObject<HTMLElement | undefined>} [params.wrapperRef] - компонент, который определяет область видимости для Intersection Observer API.
 * Согласно документации Intersection Observer, если рут null, то отслеживание будет относительно window
 * @returns {void}
 */
export const useInfiniteScroll = ({
	callback,
	triggerRef,
	wrapperRef,
}: useInfiniteScrollProps) => {
	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const wrapperElement = wrapperRef?.current ?? null;
		const triggerElement = triggerRef.current;
		if (callback && triggerElement) {
			const options = {
				root: wrapperElement,
				rootMargin: '250px 0px 0px',
			};

			observer.current = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					callback();
				}
			}, options);

			observer.current.observe(triggerElement);
		}

		return () => {
			if (observer.current && triggerElement) {
				observer.current.unobserve(triggerElement);
			}
		};
	}, [callback, triggerRef, wrapperRef]);
};
