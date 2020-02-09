import { AppState } from '../redux/root.reducer';
import { NewsState } from './newsList.reducer';
import { createSelector } from '@reduxjs/toolkit';
import { Story } from '../model/story';

export const selectNewsState = (state: AppState): NewsState => state.news;

export const selectStories = createSelector(selectNewsState, (news: NewsState) => news.stories.filter(s => s !== null) as Story[]);
export const selectStoryIds = createSelector(selectNewsState, (news: NewsState) => news.storyIds);
export const selectHasLoadedIds = createSelector(selectStoryIds, (ids: number[]) => ids.length > 0);

export const selectNextStoryToLoadIndex = createSelector(selectNewsState, (news: NewsState) => news.nextStoryToLoadIndex);
export const selecthasLoadedAllStories = createSelector(selectStoryIds, selectNextStoryToLoadIndex, (ids: number[], nextStoryIdx: number) => ids.length > nextStoryIdx);
