/* eslint-disable react/jsx-props-no-spreading */
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useStyles from './styles';
import { getPosts } from '../../actions/posts';

export default function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
}
