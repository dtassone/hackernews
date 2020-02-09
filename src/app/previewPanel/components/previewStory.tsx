import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { selectPreviewStory } from '../previewPanel.selectors';
import { PreviewPanel } from './previewPanel';
import { PreviewLoader } from './previewLoader';

/**
 * We use proxy only for some urls as sometimes, resources like CSS or other assets can't get downloaded,
 * and injected in srcDoc. This technique should work for most sites that blocks cors and loading in iframe.
 */

const PROXY = 'https://cors-anywhere.herokuapp.com/';
const WHITE_LIST = ['github.com', 'youtu.be', 'twitter.com', 'cnn.com', 'outsideonline.com', 'msn.com', 'techcrunch.com', 'tv.avclub.com', 'utu.fi'];
const isUrlOriginBlocked: (url: string) => boolean = url => WHITE_LIST.some(site => url.indexOf(site) > -1);

export const PreviewStory: React.FC<{}> = () => {
  const story = useSelector(selectPreviewStory);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iFrameSrc, setIFrameSrc] = useState();
  const [requireCorsByPass, setRequireCorsByPass] = useState(false);
  const onIFrameLoaded = useCallback(() => setIsLoading(false), [setIsLoading]);
  const onIFrameError = useCallback(() => setHasError(true), [setHasError]);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    setIFrameSrc('');

    if (story && story.url) {
      setRequireCorsByPass(isUrlOriginBlocked(story.url));
      if (requireCorsByPass) {
        const url = `${PROXY}${story && story.url}`;
        console.log(`Loading url with proxy ${url}`);

        fetch(url, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
          .then(response => response.text())
          .then(response => {
            setIFrameSrc(response);
          });
      }
    }
  }, [story, requireCorsByPass]);

  if (!story || !story.url) {
    return (
      <PreviewPanel>
        <MuiAlert severity="info">No preview available.</MuiAlert>
      </PreviewPanel>
    );
  }

  return (
    <PreviewPanel>
      {isLoading && <PreviewLoader />}
      {hasError && <MuiAlert severity="error">An error occured while loading preview.</MuiAlert>}
      <iframe
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        {...(requireCorsByPass ? { srcDoc: iFrameSrc } : { src: story.url })}
        frameBorder="none"
        onLoad={onIFrameLoaded}
        onError={onIFrameError}
      />
    </PreviewPanel>
  );
};
