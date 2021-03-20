import React from 'react';
import VerticalList from '../../components/entries/VerticalList';

export default function ChannelsTab() {
	return <VerticalList useSearchBar apiModule='channels' />;
}
