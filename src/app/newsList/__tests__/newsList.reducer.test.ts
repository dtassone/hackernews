import { newsListReducer as reducer, NEWS_INITIAL_STATE } from '../newsList.reducer';
import { newStoriesLoaded, newStoryIdsLoaded } from '../newsList.actions';
import { getTopStories } from './mockData';

describe('NewsList Reducer', () => {
  describe('Action: NewStoriesLoaded', () => {
    it('should concatenate stories', () => {
      let state = reducer(NEWS_INITIAL_STATE, newStoriesLoaded(getTopStories()));
      expect(state.stories).toEqual(getTopStories());

      state = reducer(state, newStoriesLoaded(getTopStories()));
      expect(state.stories).toEqual([...getTopStories(), ...getTopStories()]);
    });

    it('should keep track of the next story index', () => {
      let state = reducer(NEWS_INITIAL_STATE, newStoriesLoaded(getTopStories()));
      expect(state.nextStoryToLoadIndex).toEqual(3);

      state = reducer(state, newStoriesLoaded(getTopStories()));
      expect(state.nextStoryToLoadIndex).toEqual(6);
    });
  });

  describe('Action: newStoryIdsLoaded', () => {
    it('should populate storyIds', () => {
      const ids = getTopStories().map(s => s.id);
      const state = reducer(NEWS_INITIAL_STATE, newStoryIdsLoaded(ids));
      expect(state.storyIds).toEqual(ids);
    });
  });
});
