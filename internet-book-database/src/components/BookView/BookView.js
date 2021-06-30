import { Button, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import CarouselItem from '../CarouselItem/CarouselItem';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Comment from '../Comment/Comment';

const useStyles = makeStyles((theme) => ({
    buttonStyle: {
        height: "50%"
    },
    container: {
        display: "flex",
        justifyContent: "center"
    }
}));

export default function BookView(params) {
    const classes = useStyles();
    const { book, onAddReadlist, loggedUser, updateBook } = params;
    const [canRate, setCanRate] = useState(true);
    const [currentComment, setCurrentComment] = useState('');

    const [value, setValue] = React.useState(() => {
        if (!loggedUser) {
            setCanRate(false);
            return;
        }
        const rating = book.rating?.filter(rating => rating.userId === loggedUser._id);
        if (rating.length > 0) {
            setCanRate(false);
            return rating[0].value;
        } else {
            setCanRate(true);
            return 0;
        }
    });
    const rate = (event, newValue) => {
        if (canRate) {
            setValue(newValue);
            book.rating.push({ userId: loggedUser._id, value: newValue });
            setCanRate(false);
            updateBook(book);
        }
    }
    return (
        <div>
            <div>
                <CarouselItem item={book} />
            </div>
            <div className={classes.container}>
                <Button
                    className={classes.buttonStyle}
                    onClick={() => onAddReadlist(book)}
                    variant="contained"
                    color="primary"
                >
                    Add to Readlist
                </Button>

                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={rate}
                    />
                </Box>
            </div>
            <div>
                {book.comments.map((comment,indx) => <Comment key={indx} user={comment.user} comment={comment.text} createdOn={comment.time} />)}
            </div>
            {!loggedUser ? null : <div>
                <TextField
                    value={currentComment}
                    onChange={(event) => { setCurrentComment(event.target.value) }}
                    required
                    id="commentBox"
                    name="CommentBox"
                    label="Comment"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        book.comments.push({
                            user: loggedUser,
                            text: currentComment,
                            time: new Date().toDateString()
                        });
                        updateBook(book);
                        setCurrentComment('');
                    }}
                >
                    Add
                </Button>
            </div>
            }
        </div>
    )
}
