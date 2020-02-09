import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { Story } from '../model/story';

export const previewStory = createAction<Story>('previewPanel/previewStory');

export type PreviewPanelActions = PayloadAction<Story>;
