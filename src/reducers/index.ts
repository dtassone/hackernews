import {combineReducers} from "redux";
import {newsReducer, NewsState} from "./newsReducer";

export interface AppState {
    news: NewsState
}

export const rootReducer  = combineReducers({
news: newsReducer
});