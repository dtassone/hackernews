import { AppState } from '../redux/root.reducer';
import { createSelector } from '@reduxjs/toolkit';
import { MessageState } from './message.reducer';

export const selectMessageState = (state: AppState): MessageState => state.message;
export const selectError = createSelector(selectMessageState, (state: MessageState) => state.error);
