import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  listFiles: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));



export default function ListFile({ file }) {
  const classes = useStyles();

  let friendlyDate = new Date(file.lastModified);

  return (
    <List className={classes.listFiles}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ file.name } secondary={ friendlyDate.toDateString() } />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="Delete" color="danger">
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
