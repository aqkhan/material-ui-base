import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FabButton() {
  const classes = useStyles();

  return (
    <div>
      <Fab variant="extended" aria-label="Upload" className={classes.fab} color="secondary">
        <NavigationIcon className={classes.extendedIcon} />
        UPLOAD
      </Fab>
      <Fab aria-label="Delete" className={classes.fab}>
        <DeleteIcon />
      </Fab>
    </div>
  );
}