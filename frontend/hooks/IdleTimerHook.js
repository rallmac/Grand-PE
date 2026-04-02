import { useEffect, useRef, useCallback } from 'react';

export default function IdleLogout(onLogout, timeout = 2 * 60 * 60 * 1000) {
	const timer = useRef(null);

	const resetTimer = useCallback(() => {
		if (timer.current) clearTimeout(timer.current);

		timer.current = setTimeout(() => {
			onLogout(); 
		}, timeout);
	}, [onLogout, timeout]);

	window.addEventListener('storage', (event) => {
		if (event.key === 'token' && !event.newValue) {
			window.location.href = '/signin';
		}
	});

	useEffect(() => {
		const events = ['moveMouse', 'keyDown', 'click', 'scroll'];

		events.forEach((event) =>
			window.addEventListener(event, resetTimer));

		resetTimer();

		return () => {
			events.forEach((event) =>
				window.removeEventListener(event, resetTimer)
				);
			if (timer.current) clearTimeout(timer.current);
		};
	}, [resetTimer]);
}