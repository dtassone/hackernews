import React, { useState, useEffect, useCallback } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../redux/root.reducer';
import { loadNewStoryIds, loadStoriesItems } from '../newsList.thunks';
import { NewsListItem } from './newsListItem';
import { Story } from '../../model/story';
import InfiniteScroll from 'react-infinite-scroller';
import { selectStories, selectHasLoadedIds, selecthasLoadedAllStories } from '../newsList.selectors';
import { NewsListLoader } from './newsListLoader';

interface NewsListStateProps {
	stories: Story[];
	hasLoadedIds: boolean;
	hasLoadedAllStories: boolean;
}

interface NewsListDispatchProps {
	onLoad: () => void;
	loadMoreItems: () => void;
}

type NewsListProps = NewsListDispatchProps & NewsListStateProps;

export const NewsList = ({ stories, onLoad, loadMoreItems, hasLoadedAllStories, hasLoadedIds }: NewsListProps) => {
	useEffect(() => {
			onLoad();
		},
		[ onLoad ]
	);

	let storyContainerRef: any;
	const getParentContainer = useCallback(() => storyContainerRef, [ storyContainerRef ]);

	if (!hasLoadedIds) {
		return <NewsListLoader key={1} />;
	}
	return (
		<div className="newsList">
			<div className="stories-container" ref={(ref) => (storyContainerRef = ref)}>
				<InfiniteScroll
					pageStart={0}
					loadMore={loadMoreItems}
					hasMore={hasLoadedAllStories}
					loader={<NewsListLoader key={0} />}
					useWindow={false}
					getScrollParent={getParentContainer}
				>
					{stories.map((story) => <NewsListItem key={story.id} story={story} />)}
				</InfiniteScroll>
			</div>
		</div>
	);
};

const mapStateToProps = (state: AppState) => ({
	stories: selectStories(state),
	hasLoadedIds: selectHasLoadedIds(state),
	hasLoadedAllStories: selecthasLoadedAllStories(state)
});

const mapDispatchToProps = (dispatch: any) => ({
	onLoad: () => dispatch(loadNewStoryIds()),
	loadMoreItems: () => dispatch(loadStoriesItems())
});

export const NewsListContainer = connect(mapStateToProps, mapDispatchToProps)(NewsList);
