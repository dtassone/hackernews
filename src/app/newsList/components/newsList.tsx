import React, { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/root.reducer';
import { loadNewStoryIds, loadStoriesItems } from '../newsList.thunks';
import { NewsListItem } from './newsListItem';
import { Story } from '../../model/story';
import InfiniteScroll from 'react-infinite-scroller';
import { selectStories, selectHasLoadedIds, selecthasLoadedAllStories } from '../newsList.selectors';
import { NewsListLoader } from './newsListLoader';
import { InputFilter } from './inputFilter';

interface NewsListStateProps {
  stories: Story[];
  hasLoadedIds: boolean;
  hasLoadedAllStories: boolean;
}

interface NewsListDispatchProps {
  loadNewStoryIds: () => void;
  loadStoriesItems: () => void;
}

type NewsListProps = NewsListDispatchProps & NewsListStateProps;

export const NewsListComponent: React.FC<NewsListProps> = ({ stories, loadNewStoryIds, loadStoriesItems, hasLoadedAllStories, hasLoadedIds }) => {
  useEffect(() => {
    loadNewStoryIds();
  }, [loadNewStoryIds]);

  const [filterInput, setFilter] = useState('');
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const getParentContainer = useCallback(() => storyContainerRef.current, [storyContainerRef]);
  const onFilterChange = useCallback((value: string) => {
    setFilter(value);
  }, []);

  const filteredStories = useMemo(() => {
    if (filterInput.length === 0) {
      return stories;
    }
    const filterReg = new RegExp(filterInput, 'i');
    return stories.filter(s => filterReg.test(s.title) || filterReg.test(s.by) || filterReg.test(s.url));
  }, [filterInput, stories]);

  if (!hasLoadedIds) {
    return (
      <div className="newsList">
        <NewsListLoader key={1} />
      </div>
    );
  }

  return (
    <div className="newsList">
      <InputFilter onChange={onFilterChange} />
      <div className="stories-container" ref={storyContainerRef}>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadStoriesItems}
          hasMore={filterInput.length === 0 && hasLoadedAllStories}
          loader={<NewsListLoader key={0} />}
          useWindow={false}
          getScrollParent={getParentContainer}
        >
          {filteredStories.map(story => (
            <NewsListItem key={story.id} story={story} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): NewsListStateProps => ({
  stories: selectStories(state),
  hasLoadedIds: selectHasLoadedIds(state),
  hasLoadedAllStories: selecthasLoadedAllStories(state),
});

const mapDispatchToProps: NewsListDispatchProps = {
  loadNewStoryIds,
  loadStoriesItems,
};

export const NewsList = connect(mapStateToProps, mapDispatchToProps)(NewsListComponent);
