import React from 'react'

import { Link as RouterLink } from "react-router-dom";

import { Avatar, Link as MaterialLink, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: "10px"
    },
    text: {
        marginTop: "10px"
    },
    container: {
        display: "contents"
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
        marginTop: "10px"
    }
}));

export default function AvatarToolbar({ user, onLogout }) {
    const classes = useStyles();
    return (
        <div className={classes.container}>

            <div className={classes.avatar}>

                <Avatar alt="avatar" src={user.imageURL} />

            </div>
            <span className={classes.text}>
                {user.username}
            </span>
            <MaterialLink
                to="/" className={classes.menuButton} color="inherit" component={RouterLink} onClick={() => onLogout()}>
                Logout
            </MaterialLink>
        </div>


    )
}
