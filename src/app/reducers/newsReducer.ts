

import { Action } from "redux";
import { newStoriesLoaded, previewStory, newStoryIdsLoaded } from "../app/newsList/newsListAction";
import { Story } from "../app/model/story";
import { PayloadAction } from "@reduxjs/toolkit";

export interface NewsState {
    stories: Story[];
    preview?: Story;
    storyIds: number[];
    lastStoryLoadedIndex: number;
}

const INITIAL_STATE = { stories: [], storyIds: [], lastStoryLoadedIndex: 0 };

export const newsReducer = (state: NewsState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case newStoriesLoaded.type:
            return { 
                ...state, 
                stories: [...state.stories, ...action.payload], 
                lastStoryLoadedIndex: (state.lastStoryLoadedIndex + action.payload.length)
            };
        case newStoryIdsLoaded.type:
            return { ...state, storyIds: action.payload };
        case previewStory.type:
            return { ...state, preview: action.payload }
        default:
            return state
    }
}