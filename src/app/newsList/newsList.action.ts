import {createAction, Action} from '@reduxjs/toolkit';
import { Story } from '../model/story';

export const loadNews = createAction('LoadNews');
export const newStoriesLoaded = createAction<Story[]>('newStoriesLoaded');   
export const newStoryIdsLoaded = createAction<number[]>('newStoryIdsLoaded');   
export const previewStory = createAction<Story>('previewStory');