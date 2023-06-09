import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { ThumbUpAltOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
  };

  const handleLikePost = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post?.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}` }
          </>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)
            && (
            <div className={classes.overlay2}>
              <Button
                style={{ color: 'white' }}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                }}
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            </div>
            )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">{ post.tags.map((tag) => ` #${tag}`) }</Typography>
        </div>
        <Typography variant="h5" className={classes.title} gutterBottom>{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" disabled={!user?.result} onClick={() => handleLikePost()} color="primary">
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)
              && (
              <Button size="small" onClick={() => handleDeletePost()} color="primary">
                <DeleteIcon size="small" />
                Delete
              </Button>
              )}
      </CardActions>
    </Card>
  );
};

export default Post;
