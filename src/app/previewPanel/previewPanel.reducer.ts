import { Action } from "redux";
import { previewStory } from "./previewPanel.action";
import { Story } from "../model/story";

export interface PreviewPanelState {
    story: Story | null;
}
const INITIAL_STATE = { story: null };

export const previewPanelReducer = (state: PreviewPanelState = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case previewStory.type:
            return { ...state, story: action.payload }
        default:
            return state
    }
}