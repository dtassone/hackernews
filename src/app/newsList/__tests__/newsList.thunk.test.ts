/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { loadNewStoryIds, STORIES_URL, ITEM_URL, loadStoriesItems } from '../newsList.thunks';
import { AppState } from '../../redux/root.reducer';
import { NEWS_INITIAL_STATE, NullableStories } from '../newsList.reducer';
import { MESSAGE_INITIAL_STATE } from '../../message/message.reducer';
import { PREVIEW_INITIAL_STATE } from '../../previewPanel/previewPanel.reducer';
import { newStoryIdsLoaded, newStoriesLoaded } from '../newsList.actions';
import { showErrorMessage } from '../../message/message.actions';
import { getTopStories } from './mockData';
import { Story } from '../../model/story';
import { previewStory } from '../../previewPanel/previewPanel.actions';

const middlewares = [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })];
const mockStore = configureMockStore<AppState>(middlewares);

describe('NewsList Thunks', () => {
  let store: MockStoreEnhanced<AppState, any>;
  beforeEach(() => {
    store = mockStore({ news: NEWS_INITIAL_STATE, message: MESSAGE_INITIAL_STATE, preview: PREVIEW_INITIAL_STATE });
  });
  afterEach(() => {
    fetchMock.restore();
  });
  describe('Action: loadNewStoryIds', () => {
    it('should fetch new stories url', () => {
      fetchMock.get(STORIES_URL, [1, 2, 3, 4]);

      return store.dispatch(loadNewStoryIds()).then(() => {
        expect(fetchMock.lastUrl()).toEqual(STORIES_URL);
      });
    });
    it('should dispatch new story ids', () => {
      fetchMock.get(STORIES_URL, [1, 2, 3, 4]);

      return store.dispatch(loadNewStoryIds()).then(() => {
        expect(store.getActions()[0]).toEqual(newStoryIdsLoaded([1, 2, 3, 4]));
      });
    });

    it('should catch fetch exception and dispatch an error message', () => {
      fetchMock.get(STORIES_URL, 500);
      return store.dispatch(loadNewStoryIds()).then(() => {
        const dispatchedAction = store.getActions()[0];
        const expectedAction = showErrorMessage('Error loading stories');
        expect(dispatchedAction.type).toEqual(expectedAction.type);
        expect(dispatchedAction.payload).toMatch(new RegExp('^' + expectedAction.payload));
      });
    });
  });

  describe('Action: loadStoriesItems', () => {
    let store: any, storyIds: number[], mockStories: NullableStories, urls: string[];

    beforeEach(() => {
      storyIds = [0, 1, 2];
      mockStories = getTopStories();
      mockStories.forEach((s, idx) => {
        s && (s.id = storyIds[idx]);
      });
      urls = storyIds.map(id => ITEM_URL.replace('{itemId}', id.toString()));

      const stateWithStoryIds = { ...NEWS_INITIAL_STATE, storyIds };
      store = mockStore({ news: stateWithStoryIds, message: MESSAGE_INITIAL_STATE, preview: PREVIEW_INITIAL_STATE });
    });
    afterEach(() => {
      fetchMock.restore();
    });

    it('should fetch story item from ids', () => {
      return store.dispatch(loadStoriesItems()).then(() => {
        const calls = fetchMock.calls();
        const calledUrls = calls.map(c => c[0]);
        expect(calledUrls).toEqual(urls);
      });
    });
    it('should catch fetch exception and ignore stories that fails to load', () => {
      mockStories[1] = null;
      urls.forEach((url, idx) => {
        if (idx === 1) {
          fetchMock.get(url, 500);
        } else {
          fetchMock.get(url, JSON.stringify(mockStories[idx]));
        }
      });

      return store.dispatch(loadStoriesItems()).then(() => {
        const dispatchedAction = store.getActions();
        const newStoriesAction = newStoriesLoaded(mockStories);

        expect(dispatchedAction[1]).toEqual(newStoriesAction);
      });
    });
    it('should dispatch story loaded in batch', () => {
      urls.forEach((url, idx) => {
        fetchMock.get(url, JSON.stringify(mockStories[idx]));
      });

      return store.dispatch(loadStoriesItems()).then(() => {
        const dispatchedAction = store.getActions();
        const previewAction = previewStory(mockStories[0] as Story);
        const newStoriesAction = newStoriesLoaded(mockStories);

        expect(dispatchedAction[0]).toEqual(previewAction);
        expect(dispatchedAction[1]).toEqual(newStoriesAction);
      });
    });
    it('should dispatch a preview story action for the first story', () => {
      urls.forEach((url, idx) => {
        fetchMock.get(url, JSON.stringify(mockStories[idx]));
      });
      return store.dispatch(loadStoriesItems()).then(() => {
        const dispatchedAction = store.getActions();
        const previewAction = previewStory(mockStories[0] as Story);

        expect(dispatchedAction[0]).toEqual(previewAction);
      });
    });
    it('should start fetching stories from the next story index and not dispatch a preview story', () => {
      const stateWithStoryIds = { ...NEWS_INITIAL_STATE, storyIds: [0, 1, 2, 3, 4], nextStoryToLoadIndex: 3 };
      store = mockStore({ news: stateWithStoryIds, message: MESSAGE_INITIAL_STATE, preview: PREVIEW_INITIAL_STATE });
      const expectedStories = [3, 4].map(id => {
        const story = mockStories[0] as Story;
        story.id = id;
        return story;
      });

      urls = [3, 4].map((id, idx) => {
        const url = ITEM_URL.replace('{itemId}', id.toString());
        fetchMock.get(url, JSON.stringify(expectedStories[idx]));
        return url;
      });

      return store.dispatch(loadStoriesItems()).then(() => {
        const dispatchedAction = store.getActions();
        const newStoriesAction = newStoriesLoaded(mockStories);

        const calls = fetchMock.calls();
        const calledUrls = calls.map(c => c[0]);
        expect(calledUrls).toEqual(urls);

        expect(dispatchedAction[0].type).toEqual(newStoriesAction.type);
        expect(dispatchedAction[0].payload).toEqual(expectedStories);
      });
    });
  });
});
