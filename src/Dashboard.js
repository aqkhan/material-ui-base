import React, { useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Title from './Title';

// Drag n Drop
import { useDropzone } from 'react-dropzone';

// List File View
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import DeleteIcon from '@material-ui/icons/Delete';

// Fab button
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import axios from 'axios';

// Progress bar
import ProgressBar from './ProgressBar';

// Notify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://alphasquad.studio">
        Alpha Squad
      </Link>
      {' team.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  listFiles: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: '#00518957',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


export default function Dashboard() {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  // Dropped files
  const [ droppedFiles, updateDroppedFiles ] = React.useState([]);

  // Upload helpers
  const [ uploading, setUploadingState ] = React.useState(false);

  // Default files progress
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // Drag n Drop custom component

  const PaperDropZone = () => {
    const onDrop = useCallback(acceptedFiles => {
      acceptedFiles.map( (file) => file.progress = 1)
      let newDroppedFiles = droppedFiles.concat(acceptedFiles);
      updateDroppedFiles(newDroppedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone({ onDrop })
  
    return (
        <>
            <Title>Drag & Drop Files</Title>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div style={{ minHeight: 300, padding: 15, border: '5px dotted #00518957' }}>
                    <Typography variant="body2" color="textSecondary" align="center">
                    {!isDragActive && 'Click here or drop a file to upload!'}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    </Typography>
                </div>
            </div>
        </>
    )
  }

  // Remove dropped file
  const removeFile = (key) => {
    let newDroppedFiles = droppedFiles.filter( (file, index) => {
      if (index !== key)
        return file
    });
    updateDroppedFiles(newDroppedFiles);
  }

  // Discard all locally loaded files
  const removeAllFiles = () => {
    updateDroppedFiles([]);
  }

  // Friendly date

  const friendlyDate = (timeStamp) => {
    let fd = new Date(timeStamp);
    return fd.toDateString();
  }

  // Upload and remove all button

  const FabButton = () => {
    const classes = useStyles();
  
    return (
      <div>
        <Fab variant="extended" aria-label="Upload" className={classes.fab} color="primary" onClick={ () => uploadFiles() }>
          <NavigationIcon className={classes.extendedIcon} />
          UPLOAD
        </Fab>
        <Fab aria-label="Delete" className={classes.fab} onClick={ () => removeAllFiles() }>
          <DeleteIcon />
        </Fab>
      </div>
    );
  }

  // Handle Upload Synchronously
  const uploadFiles = () => {
    // and so it begins
    toast('Uploading files... 👋');
    if(droppedFiles.length > 0) {
      setUploadingState(true);
      let count = 1;
      droppedFiles.map( (file, index) => {
        let b64String = getBase64(file);
        b64String.then( res => {
          let data = {
            file: res,
            fileName: file.name
          }
          axios.post("https://z7mswkyrjc.execute-api.us-east-1.amazonaws.com/dev/upload", data, {
            onUploadProgress: ProgressEvent => {
              let lul = (ProgressEvent.loaded / ProgressEvent.total*100);
              let collectiveProgress = [ ...droppedFiles ];
              collectiveProgress[index].progress = lul;
              updateDroppedFiles(collectiveProgress);
            }
          });
          count++;
          if(count === droppedFiles.length) {
            setUploadingState(false);
            toast('Files Uploaded 👋');
          }
        });
      });
      
    }
  }

  // Base64 BC
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Typography>
            <img width="130" src="https://img.pagecloud.com/pV_q2gEvwVyc6-f40Y1g5b-rX_k=/275x0/filters:no_upscale()/helux/images/image-ID-b56ffa65-3bc7-46c4-8458-7f9e22d92530.png" alt="Helux Logo" />
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Drag n Drop */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <>
                  <PaperDropZone />
                </>
              </Paper>
            </Grid>
            {/* File List */}
            { droppedFiles.length > 0 &&
              
              <Grid item xs={12}>
                
                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                  <FabButton />
                </Grid>
                <Paper className={classes.paper}>
                    <Title>Files to Upload</Title>
                    <ul>
                      {
                        droppedFiles.length > 0 && droppedFiles.map( (file, index) => (
                          <List className={classes.listFiles} key={index}>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <WorkIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={ file.name } secondary={ friendlyDate( file.lastModified ) } />
                              <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="Delete" onClick={ () => removeFile(index) }>
                                      <DeleteIcon />
                                  </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                            {
                              uploading && 
                              <ListItem>
                                <ProgressBar key={ index } progress={file.progress} />
                              </ListItem>
                            }
                          </List>
                        ))
                      }
                    </ul>
                </Paper>
              </Grid>
            }
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <MadeWithLove />
      </main>
    </div>
  );
}