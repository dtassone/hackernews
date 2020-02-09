import { Story } from '../../model/story';

const TOP_STORIES: Story[] = [
  {
    by: 'g-andrade',
    descendants: 0,
    id: 22284762,
    score: 1,
    time: 1581287432,
    title: 'The home of 2020 (1989) [video]',
    type: 'story',
    url: 'https://www.bbc.co.uk/archive/the_home_of_2020_/zj2wkmn',
  },
  {
    by: 'dc352',
    descendants: 0,
    id: 22284756,
    score: 2,
    time: 1581287311,
    title: 'Secure by Design – The Economics, Stupid',
    type: 'story',
    url: 'https://keychest.net/stories/secure-by-design-will-not-work-the-economics-stupid-',
  },
  {
    by: 'totalZero',
    descendants: 0,
    id: 22284749,
    score: 1,
    time: 1581287274,
    title: "Argentina won't repay IMF debt till recession over, VP Fernandez says",
    type: 'story',
    url: 'https://www.reuters.com/article/us-cuba/argentina-over-vp-fernandez-says-idUSKBN20302R',
  },
];

export const getTopStories: () => Story[] = () => [...TOP_STORIES.map(s => ({ ...s }))];
it('should generate mock data', () => {
  expect(getTopStories()).not.toBe(TOP_STORIES);
});
