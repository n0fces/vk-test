import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useThrottle } from './useThrottle';

describe('useThrottle', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it('should call the callback immediately and then throttles subsequent calls within the delay', () => {
		const callback = vi.fn();
		const delay = 1000;

		const { result } = renderHook(() => useThrottle(callback, delay));

		act(() => {
			result.current('first call');
			result.current('second call');
			result.current('third call');
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith('first call');

		act(() => {
			vi.advanceTimersByTime(500);
		});

		expect(callback).toHaveBeenCalledTimes(1);

		act(() => {
			vi.advanceTimersByTime(500);
		});

		act(() => {
			result.current('fourth call');
		});

		expect(callback).toHaveBeenCalledTimes(2);
		expect(callback).toHaveBeenCalledWith('fourth call');
	});
});
