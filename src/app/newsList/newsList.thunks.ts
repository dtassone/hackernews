import { AppState } from '../redux/root.reducer';
import { Story } from '../model/story';
import { newStoriesLoaded, newStoryIdsLoaded } from './newsList.actions';
import { selectNextStoryToLoadIndex, selectStoryIds } from './newsList.selectors';
import { Dispatch } from 'redux';
import { previewStory } from '../previewPanel/previewPanel.actions';
import { showErrorMessage } from '../message/message.actions';

export const STORIES_URL = 'https://hacker-news.firebaseio.com/v0/newstories.json';
export const ITEM_URL = 'https://hacker-news.firebaseio.com/v0/item/{itemId}.json';
export const PAGE_SIZE = 5;

export const loadNewStoryIds = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    return new Promise<void>(async resolve => {
      try {
        const response: Response = await fetch(STORIES_URL);
        const storyIds: number[] = await response.json();
        dispatch(newStoryIdsLoaded(storyIds));
      } catch (err) {
        const message = `Error loading stories - ${err && err.message}`;
        console.error(message);
        dispatch(showErrorMessage(message));
        dispatch(newStoryIdsLoaded([]));
      }
      resolve();
    });
  };
};

export const loadStoriesItems = () => {
  return async (dispatch: Dispatch, getState: () => AppState): Promise<void> => {
    return new Promise<void>(async resolve => {
      const appState = getState();
      const nextStoryIndex = selectNextStoryToLoadIndex(appState);
      const storyIds = selectStoryIds(appState);

      const maxIndex = storyIds.length > PAGE_SIZE ? PAGE_SIZE : storyIds.length;

      const storiesPromises: Promise<Story | null>[] = [...storyIds].splice(nextStoryIndex, maxIndex).map(async (id: number) => {
        return fetch(ITEM_URL.replace('{itemId}', id.toString()))
          .then(response => response.json())
          .catch(() => null); //we ignore stories that fail to load
      });

      try {
        const stories = await Promise.all(storiesPromises);

        if (nextStoryIndex === 0) {
          dispatch(previewStory(stories.filter(s => s !== null)[0] as Story));
        }
        dispatch(newStoriesLoaded(stories));
      } catch (err) {
        const message = `Error loading stories - ${err && err.message}`;
        console.error(message);
        dispatch(showErrorMessage(message));
      }

      resolve();
    });
  };
};
