import React from 'react';
import VerticalList from 'components/entries/VerticalList';

export default function StickersTab() {
	return <VerticalList useFilters useSearchBar apiModule='stickers' />;
}
