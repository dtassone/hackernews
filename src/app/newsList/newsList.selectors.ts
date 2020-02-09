import { AppState } from '../redux/root.reducer';
import { NewsState } from './newsList.reducer';
import { createSelector } from '@reduxjs/toolkit';

export const selectNewsState = (state: AppState) => state.news;

export const selectStories = createSelector(selectNewsState, (news: NewsState) => news.stories);
export const selectStoryIds = createSelector(selectNewsState, (news: NewsState) => news.storyIds);
export const selectHasLoadedIds = createSelector(selectStoryIds, (ids: number[]) => ids.length > 0);

export const selectLastStoryLoadedIndex = createSelector(
	selectNewsState,
	(news: NewsState) => news.lastStoryLoadedIndex
);
export const selecthasLoadedAllStories = createSelector(
	selectStoryIds,
	selectLastStoryLoadedIndex,
	(ids: number[], lastStoryLoadedIndex: number) => ids.length > lastStoryLoadedIndex
);
