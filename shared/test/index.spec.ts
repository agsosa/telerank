import { Categories, getLocaleObjectFromCategory, getCategoryFromLocaleString } from '../src';

test('Categories', () => {
	Object.values(Categories).forEach((q) => {
		expect(q).toMatchObject({
			es: expect.any(String),
			en: expect.any(String),
		});
	});
});

test('getCategoryFromLocaleString', () => {
	expect(getCategoryFromLocaleString('health')).toEqual('HEALTH');
	expect(getCategoryFromLocaleString('SALUD')).toEqual('HEALTH');
	expect(getCategoryFromLocaleString('Salúd')).toEqual('HEALTH');
	expect(getCategoryFromLocaleString('pelícuLas')).toEqual('VIDEOS_MOVIES');
	expect(getCategoryFromLocaleString('foo')).toEqual('NO_CATEGORY');
	expect(getCategoryFromLocaleString('')).toEqual('NO_CATEGORY');
});

test('getLocaleObjectFromCategory', () => {
	expect(getLocaleObjectFromCategory('music')).toHaveProperty('en', 'Music');
	expect(getLocaleObjectFromCategory('MUSIC')).toHaveProperty('es', 'Música');
	expect(getLocaleObjectFromCategory('MUSICA')).toHaveProperty('en', 'Uncategorized');
	expect(getLocaleObjectFromCategory('')).toHaveProperty('es', 'Sin categorizar');
});
