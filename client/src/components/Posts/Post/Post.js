import React, { useState } from 'react'
import { Card, CardMedia, CardActions, CardContent, Typography, Button, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletedPost, likePost, getPost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);
    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);


    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== (userId)));
        } else {
            setLikes([...post.likes, userId]);
        }
    }

    const Likes = () => {
        if (post?.likes?.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = (e) => {
        history.push(`/posts/${post._id}`);
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.overlay2}>
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button style={{ color: 'white' }} size="small" onClick={(e) => {
                            e.stopPropagation();
                            setCurrentId(post._id)
                        }}>
                            <MoreHorizIcon fontSize='medium' /></Button>
                    )}
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </ButtonBase>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletedPost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>

        </Card >
    )
}

export default Post;