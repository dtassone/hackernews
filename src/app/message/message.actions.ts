import { createAction, PayloadAction } from '@reduxjs/toolkit';

export const showErrorMessage = createAction<string>('App/showErrorMessage');
export type MessageActions = PayloadAction<string>;
