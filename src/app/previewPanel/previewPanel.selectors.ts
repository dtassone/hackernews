import { AppState } from "../redux/root.reducer";
import { createSelector } from "@reduxjs/toolkit";

export const selectPreviewState = (state: AppState) => state.preview;
export const selectPreviewStory = createSelector(selectPreviewState, (p) => p.story);