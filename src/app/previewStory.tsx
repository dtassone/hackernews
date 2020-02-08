import { createSelector } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { AppState } from '../reducers';
import { useSelector } from 'react-redux';
import { sanitize } from 'dompurify';
import MuiAlert from '@material-ui/lab/Alert';
import { LinearProgress, CircularProgress } from '@material-ui/core';

export const previewStorySelector = createSelector((state: AppState) => state.news.preview, (preview) => preview);
const proxyCors = 'https://cors-anywhere.herokuapp.com/';

export const PreviewStory: React.FC<any> = () => {
	const story = useSelector(previewStorySelector);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ hasError, setHasError ] = useState(false);

	// useEffect(
	// 	() => {
	// 		if (story) {
	// 			fetch(proxyCors + story.url)
	// 				.then((r) => r.text())
	// 				.then((storyPreviewHtml) => setHtml(storyPreviewHtml))
	// 				.catch((err) => console.error('Something bad', err));
	// 		}
	// 	},
	// 	[ story ]
	// );
	useEffect(() => setIsLoading(true), [ story ]);

	if (story) {
		if (story.url) {
			return (
				<div className="preview">
					{isLoading && (
						<div className="loading-info">
							{/* <MuiAlert severity="info">Loading {story.url}</MuiAlert> */}
							<LinearProgress />
						</div>
					)}
					{hasError && <MuiAlert severity="error">An error occured while loading preview.</MuiAlert>}
					<iframe
						src={story.url}
						frameBorder="none"
						onLoad={(e) => {
							console.log('loaded', e);
							setIsLoading(false);
						}}
						onError={() => console.log('ERRRRRROR')}
					/>
				</div>
			);
		} else {
			return (
				<div className="preview">
					<MuiAlert severity="warning">No Url found!</MuiAlert>
				</div>
			);
		}
	}
	return (
		<div className="preview">
		</div>
	);
};
// export const PreviewStoryContainer = connect(

// )(PreviewStory);
