import React from 'react';
import VerticalList from '../../components/entries/VerticalList';

export default function ChannelsTab() {
	return <VerticalList useFilters useSearchBar apiModule='channels' />;
}
