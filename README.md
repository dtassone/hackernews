# Welcome to the HackerNews Reader

The app is pointing at `https://hacker-news.firebaseio.com/v0/newstories.json` <br />
Maximum story loaded is 500. <br />
I have wrote only a small number of tests for the NewsList reducer and thunk, I was planning to add tests for components using enzyme but I didn't get the time.

The search box is filtering only the loaded stories. And I'm using a regexp to search in the story array. however I did not escape the input value and if you type any special char, you will see a "nice" error handling.

You can also cut your connection to see how it is handled.

## Features to add
- Allow to switch endpoints, to topStories
- List more item types such poll, job, and add corresponding avatar
- Load comments in the preview panel, and display in a popover.
- Allow to save stories in your list
- much more....

### `yarn start`

Start webpack-dev-server.
<br />
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Runs webpack and build the app in Development mode.

### `yarn lint`

Apply esLint and prettier on the app `src` folder.