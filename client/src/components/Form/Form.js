import useStyles from "./styles";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId) : null);

    const [ postData, setPostData ] = useState({
        creator: '', title: '', message: '', tags: '', selectedFile: ''
    });


    useEffect(() => {
      if (post) {
          setPostData(post);
      }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '', title: '', message: '', tags: '', selectedFile: ''
        });
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId ? 'Editing' : 'Creating'} a Memory
                </Typography>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator:"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData(prevState => ({...prevState, creator: e.target.value}))}
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title:"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData(prevState => ({...prevState, title: e.target.value}))}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message:"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData(prevState => ({...prevState, message: e.target.value}))}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags:"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData(prevState => ({...prevState, tags: e.target.value.split(',')}))}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData(prevState => ({...prevState, selectedFile: base64}))}
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
    )
}

export default Form
