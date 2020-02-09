import { combineReducers, Reducer } from 'redux';
import { newsListReducer, NewsState } from '../newsList/newsList.reducer';
import { previewPanelReducer, PreviewPanelState } from '../previewPanel/previewPanel.reducer';
import { messageReducer, MessageState } from '../message/message.reducer';
import { NewsListActions } from '../newsList/newsList.actions';
import { MessageActions } from '../message/message.actions';
import { PreviewPanelActions } from '../previewPanel/previewPanel.actions';

export interface AppState {
  news: NewsState;
  preview: PreviewPanelState;
  message: MessageState;
}

export type AppActions = NewsListActions & MessageActions & PreviewPanelActions;

export const rootReducer: Reducer<AppState, AppActions> = combineReducers<AppState, AppActions>({
  news: newsListReducer,
  preview: previewPanelReducer,
  message: messageReducer,
});
