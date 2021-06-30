import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ForwardIcon from '@material-ui/icons/Forward';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    text: {
        marginLeft: "10px",
    },
}));

export default function ReadlistItem({ item, removeItem, moreInformation }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ListItem>
                <ListItemAvatar>
                    <img alt='' style={{ width: "50px" }} src={item.imageURL} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.name}
                    className={classes.text}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="forward" onClick={() => moreInformation(item)}>
                        <ForwardIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => removeItem(item)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>
    )
}
