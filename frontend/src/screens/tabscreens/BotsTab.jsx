import React from 'react';
import VerticalList from 'components/entries/VerticalList';

export default function BotsTab() {
	return <VerticalList useFilters useSearchBar apiModule='bots' />;
}
