import { createAction, PayloadAction, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Story } from '../model/story';
import { NullableStories } from './newsList.reducer';

export const newStoriesLoaded: ActionCreatorWithPayload<NullableStories, string> = createAction<NullableStories>('newsList/newStoriesLoaded');
export const newStoryIdsLoaded: ActionCreatorWithPayload<number[], string> = createAction<number[]>('newsList/newStoryIdsLoaded');

export type NewsListActions = PayloadAction<Story[]> | PayloadAction<number[]>;
