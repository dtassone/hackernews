import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { selectPreviewStory } from '../previewPanel.selectors';
import { PreviewPanel } from './previewPanel';
import { PreviewLoader } from './previewLoader';

const proxyCors = 'https://cors-anywhere.herokuapp.com/';

export const PreviewStory: React.FC<any> = () => {
	const story = useSelector(selectPreviewStory);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ hasError, setHasError ] = useState(false);

	useEffect(() => {
		setHasError(false);
		setIsLoading(true);
	}, [ story ]);

	if (!story) {
		return <PreviewPanel />;
	}

	if (!story.url) {
		return (
			<PreviewPanel>
				<MuiAlert severity="warning">No Url found!</MuiAlert>
			</PreviewPanel>
		);
	}

	return (
		<PreviewPanel>
			{isLoading && (
				<PreviewLoader />
			)}
			{hasError && <MuiAlert severity="error">An error occured while loading preview.</MuiAlert>}
			<iframe
				src={story.url}
				frameBorder="none"
				onLoad={() => setIsLoading(false)}
				onError={() => setHasError(true)}
			/>
		</PreviewPanel>
	);
};