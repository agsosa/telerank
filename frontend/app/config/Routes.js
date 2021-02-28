import { React } from 'react';

export function getRouteInfo(routeName) {
	switch (routeName) {
		case 'Home':
			return { title: 'Home', extendHeaderGradient: false };
		case 'Details':
			return { title: 'Details', extendHeaderGradient: true };
		case 'Settings':
			return { title: 'Details', extendHeaderGradient: false };
		default:
			return { tittle: routeName, extendHeaderGradient: false };
	}
}
