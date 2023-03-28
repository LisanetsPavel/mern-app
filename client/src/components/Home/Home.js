import { Container, Grid, Grow } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from '../../styles';
import { getPosts } from '../../actions/posts';

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.mainContainer}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
