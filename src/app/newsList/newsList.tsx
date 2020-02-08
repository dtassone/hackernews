import React, { useState, useEffect } from 'react';
// import {loadNews} from "./newsListAction";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { loadNewStoryIds, loadStoriesItems } from './newsList-thunks';
import { NewsListItem } from './newsListItem';
import { Story } from '../model/story';
import InfiniteScroll from 'react-infinite-scroller';
import { CircularProgress } from '@material-ui/core';

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
	useEffect(
		() => {
			console.log('loading stories');
			onLoad();
		},
		[ onLoad ]
	);

	console.log(stories);
	let storyContainerRef: any;

	if (!hasLoadedIds) {
		return <Loader key = {12313} />;
	}
	return (
		<div className="newsList">
			<div className="stories-container" ref={(ref) => (storyContainerRef = ref)}>
				<InfiniteScroll
					pageStart={0}
					loadMore={loadMoreItems}
					hasMore={hasLoadedAllStories}
					loader={<Loader key = {0} />}
					useWindow={false}
					getScrollParent={() => storyContainerRef}
				>
					{stories.map((story) => <NewsListItem key={story.id} story={story} />)}
				</InfiniteScroll>
			</div>
		</div>
	);
};

//TODO useSelector
const mapStateToProps = (state: AppState) => ({
	stories: state.news.stories,
	hasLoadedIds: state.news.storyIds.length > 0,
	hasLoadedAllStories: state.news.storyIds.length > state.news.lastStoryLoadedIndex
});

const mapDispatchToProps = (dispatch: any) => ({
	onLoad: () => dispatch(loadNewStoryIds()),
	loadMoreItems: () => dispatch(loadStoriesItems())
});

export const NewsListContainer = connect(mapStateToProps, mapDispatchToProps)(NewsList);


const Loader = ()=> (
    <div className="news-list-loader">
        <CircularProgress />
    </div>
);