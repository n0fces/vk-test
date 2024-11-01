import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useInfiniteScroll } from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
	let observe: ReturnType<typeof vi.fn>;
	let unobserve: ReturnType<typeof vi.fn>;

	beforeAll(() => {
		observe = vi.fn();
		unobserve = vi.fn();

		global.IntersectionObserver = vi.fn((callback) => ({
			observe: observe.mockImplementation((element) => {
				callback([{ isIntersecting: true, target: element }]);
			}),
			unobserve,
			disconnect: vi.fn(),
		})) as unknown as typeof IntersectionObserver;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should call the callback when the trigger element intersects', () => {
		const callback = vi.fn();
		const triggerRef = { current: document.createElement('div') };
		const wrapperRef = { current: document.createElement('div') };

		renderHook(() => {
			useInfiniteScroll({ callback, triggerRef, wrapperRef });
		});

		expect(observe).toHaveBeenCalledWith(triggerRef.current);
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should unobserve the trigger element on cleanup', () => {
		const callback = vi.fn();
		const triggerRef = { current: document.createElement('div') };
		const wrapperRef = { current: document.createElement('div') };

		const { unmount } = renderHook(() => {
			useInfiniteScroll({ callback, triggerRef, wrapperRef });
		});

		unmount();

		expect(unobserve).toHaveBeenCalledWith(triggerRef.current);
	});
});
