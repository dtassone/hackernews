import { newStoriesLoaded, newStoryIdsLoaded, NewsListActions } from './newsList.actions';
import { Story } from '../model/story';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Reducer } from 'redux';

export type NullableStories = (Story | null)[];
export interface NewsState {
  stories: NullableStories;
  preview?: Story;
  storyIds: number[];
  nextStoryToLoadIndex: number;
}

export const NEWS_INITIAL_STATE: NewsState = { stories: [], storyIds: [], nextStoryToLoadIndex: 0 };

export const newsListReducer: Reducer<NewsState, NewsListActions> = createReducer(NEWS_INITIAL_STATE, {
  [newStoriesLoaded.type]: (state, action: PayloadAction<Story[]>) => {
    return {
      ...state,
      stories: [...state.stories, ...action.payload],
      nextStoryToLoadIndex: state.nextStoryToLoadIndex + action.payload.length,
    };
  },
  [newStoryIdsLoaded.type]: (state, action: PayloadAction<number[]>) => {
    return { ...state, storyIds: action.payload as number[] };
  },
});
