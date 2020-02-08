import { Action, Dispatch, AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch, } from 'redux-thunk'
import { AppState } from '../../reducers';
import { Story } from '../model/story';
import { newStoriesLoaded, newStoryIdsLoaded, previewStory } from './newsListAction';

const STORIES_URL = 'https://hacker-news.firebaseio.com/v0/newstories.json';
const ITEM_URL = 'https://hacker-news.firebaseio.com/v0/item/{itemId}.json';

export const loadNewStoryIds = () => {
    return async (dispatch: any) => {
        return new Promise<void>(async (resolve) => {
            const response: any = await fetch(STORIES_URL);
            const storyIds = await response.json();;

            console.log('result', storyIds);
            dispatch(newStoryIdsLoaded(storyIds));

            //TODO handle errors
            // .catch(err => console.error('something bad happened! ', err));

            resolve();
        });
    }
};

const PAGE_SIZE = 40;

export const loadStoriesItems = () => {
    return async (dispatch: any, getState: () => AppState) => {
        return new Promise<void>(async (resolve) => {
            //TODO useSelector here 
            const appState = getState();
            const lastStoryLoaded = appState.news.lastStoryLoadedIndex;
            const storyIds = appState.news.storyIds;

            const maxIndex = storyIds.length > PAGE_SIZE ? PAGE_SIZE : storyIds.length;

            const storiesPromises: Promise<Story>[] = [...storyIds].splice(lastStoryLoaded, maxIndex).map(async (id: number) => {
                return fetch(ITEM_URL.replace('{itemId}', id.toString())).then(response => response.json());
            });

            Promise.all(storiesPromises)
                .then(stories => {
                    if (lastStoryLoaded === 0) {
                        dispatch(previewStory(stories[0]));
                    }
                    dispatch(newStoriesLoaded(stories));
                })
                .catch(err => console.error('something bad happened! ', err));
            resolve();
        });
    }
}




            // const stories = storyIds.splice(0, 10).map(async (id: number) => {
            //     const response = await fetch(ITEM_URL.replace('{itemId}', id.toString()));
            //     const story: Story = await response.json();
            //     console.log(story);
            //     return story;
            // });
            //dispatch number of results