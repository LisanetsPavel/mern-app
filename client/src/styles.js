import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  mainContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));
