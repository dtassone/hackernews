/* eslint-disable react/display-name */
import React, { useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import { Story } from '../../model/story';
import { useDispatch } from 'react-redux';
import { previewStory } from '../../previewPanel/previewPanel.actions';
import { OpenInNew } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

export interface NewsListItemProps {
  story: Story;
}

export const NewsListItem: React.FC<NewsListItemProps> = React.memo(({ story }) => {
  const dispatch = useDispatch();
  const onItemClick = useCallback(() => dispatch(previewStory(story)), [story, dispatch]);
  const openInNewWindow = useCallback(() => window.open(story.url, '_blank'), [story]);

  return (
    <ListItem className="news-list-item flex-col" alignItems="flex-start" button={true} onClick={onItemClick}>
      <ListItem className="flex-row flex no-padding">
        <ListItemAvatar>
          <img src="./hk.png" className="hk-logo" />
        </ListItemAvatar>
        <ListItemText
          primary={story.title}
          secondary={
            <span className="news-list-item-url">
              <Typography component="span" variant="body2" color="textPrimary">
                {story.by}
              </Typography>
              {story.url && ' — ' + story.url}
            </span>
          }
        />
      </ListItem>
      <RatingBox value={story.score} />
      <div className="open-new-window" onClick={openInNewWindow}>
        <OpenInNew color="primary" />
      </div>
    </ListItem>
  );
});

const useStyles = makeStyles({
  root: {
    fontSize: '0.9rem',
    alignSelf: 'flex-end',
  },
});

const RatingBox: React.FC<{ value: number }> = ({ value }) => {
  const classes = useStyles();
  return <Rating name="read-only" classes={{ root: classes.root }} value={value} readOnly />;
};
