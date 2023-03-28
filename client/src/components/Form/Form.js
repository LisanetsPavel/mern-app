import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
  const user = JSON.parse(localStorage.getItem('profile'));

  const [postData, setPostData] = useState({
    title: '', message: '', tags: '', selectedFile: '',
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '', message: '', tags: '', selectedFile: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create you own momories
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? 'Editing' : 'Creating'} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title:"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData((prevState) => ({ ...prevState, title: e.target.value }))}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message:"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData((prevState) => ({ ...prevState, message: e.target.value }))}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags:"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData((prevState) => ({ ...prevState, tags: e.target.value.split(',') }))}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData((prevState) => ({ ...prevState, selectedFile: base64 }))}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="container" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
