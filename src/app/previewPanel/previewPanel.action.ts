import {createAction, Action} from '@reduxjs/toolkit';
import { Story } from '../model/story';

export const previewStory = createAction<Story>('previewStory');