import { previewStory, PreviewPanelActions } from './previewPanel.actions';
import { Story } from '../model/story';
import { Reducer } from 'redux';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

export interface PreviewPanelState {
  story: Story | null;
}
export const PREVIEW_INITIAL_STATE: PreviewPanelState = { story: null };

export const previewPanelReducer: Reducer<PreviewPanelState, PreviewPanelActions> = createReducer(PREVIEW_INITIAL_STATE, {
  [previewStory.type]: (state: PreviewPanelState, action: PayloadAction<Story>) => ({ ...state, story: action.payload }),
});
