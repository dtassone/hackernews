import React, { useCallback } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Story } from '../model/story';
import { previewStory } from './newsListAction';
import { useDispatch } from 'react-redux';
import { Icon } from '@material-ui/core';
import { MenuBook, OpenInNew } from '@material-ui/icons';

export interface NewsListItemProps {
	story: Story;
}

export const NewsListItem: React.FC<NewsListItemProps> = ({ story }) => {
	const dispatch = useDispatch();
	const onItemClick = useCallback(() => dispatch(previewStory(story)), [ story, dispatch ]);
	const openInNewWindow = useCallback(() => window.open(story.url, '_blank'), [ story ]);

	return (
		<ListItem className="news-list-item" alignItems="flex-start" button={true} onClick={onItemClick}>
			<ListItemAvatar>
				<img src="./hk.png" className="hk-logo" />
			</ListItemAvatar>
			<ListItemText
				primary={story.title}
				secondary={
					<div className="news-list-item-url">
						<Typography component="span" variant="body2" color="textPrimary">
							{story.by}
						</Typography>
						{' — ' + story.url}
					</div>
				}
			/>
			<div className="open-new-window" onClick={openInNewWindow}>
				<OpenInNew color="primary" />
			</div>
		</ListItem>
	);
};
