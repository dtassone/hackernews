import { useSelector } from 'react-redux';
import { selectError } from '../message/message.selectors';
import React from 'react';
import { ErrorMessage } from '../message/errorMessage';
import { ErrorBoundary } from './errorHandler';
import { Header } from './header';
import { NewsList } from '../newsList/components/newsList';
import { PreviewStory } from '../previewPanel/components/previewStory';

export const Layout: React.FC<{}> = () => {
  const errorMessage = useSelector(selectError);
  return (
    <>
      <Header />
      <ErrorBoundary>
        <ErrorMessage message={errorMessage} />
        <div className="main-container">
          <NewsList />
          <PreviewStory />
        </div>
      </ErrorBoundary>
    </>
  );
};
