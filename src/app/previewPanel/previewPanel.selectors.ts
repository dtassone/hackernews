import { AppState } from '../redux/root.reducer';
import { createSelector } from '@reduxjs/toolkit';
import { PreviewPanelState } from './previewPanel.reducer';

export const selectPreviewState = (state: AppState): PreviewPanelState => state.preview;
export const selectPreviewStory = createSelector(selectPreviewState, p => p.story);
