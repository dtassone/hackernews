import { combineReducers } from "redux";
import { newsReducer, NewsState } from "../newsList/newsList.reducer";
import { previewPanelReducer, PreviewPanelState } from "../previewPanel/previewPanel.reducer";

export interface AppState {
    news: NewsState,
    preview: PreviewPanelState
}

export const rootReducer = combineReducers({
    news: newsReducer,
    preview: previewPanelReducer
});