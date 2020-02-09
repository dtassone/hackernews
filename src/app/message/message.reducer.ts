import { MessageActions, showErrorMessage } from './message.actions';
import { Reducer } from 'redux';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

export interface MessageState {
  error: string;
}
export const MESSAGE_INITIAL_STATE: MessageState = { error: '' };

export const messageReducer: Reducer<MessageState, MessageActions> = createReducer(MESSAGE_INITIAL_STATE, {
  [showErrorMessage.type]: (state: MessageState, action: PayloadAction<string>) => ({ ...state, error: action.payload }),
});
