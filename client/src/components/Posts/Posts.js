import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack';
import { Grid, CircularProgress } from '@material-ui/core'

const Posts = ({ setCurrentId }) => {

    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return <div style={{
        color: '#333300', fontSize: '50px', fontWeight: 'bolder', textAlign: 'center', marginTop: '50px', textShadow: '2px 3px 7px rgba(230, 0, 0, 0.55)'
    }}> No Posts Available</div >;

    return (
        isLoading ? <Stack alignItems="center"><CircularProgress size='13em' style={{
            color: '#333300', marginTop: '50px'
        }} /></Stack> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts?.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;