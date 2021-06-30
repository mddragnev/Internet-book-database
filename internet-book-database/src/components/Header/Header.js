import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { FormControl, makeStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Link as RouterLink } from "react-router-dom";
import { Link as MaterialLink } from '@material-ui/core';
import AvatarToolbar from './AvatarToolbar';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarSearchBar: {
        marginLeft: "auto",
        marginRight: "auto",
        width: '60%'
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    logo: {
        width: 50,
        position: 'absolute'
    },
    margin: {
        margin: theme.spacing(1),
    }
}));

export default function Header(props) {
    const classes = useStyles();

    const { sections, loggedUser, onSearch, isAdmin } = props;

    const [searchText, setSearchText] = useState('');

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <MaterialLink to="/" component={RouterLink}>
                    <IconButton>
                        <img className={classes.logo} src="images/logo.png" alt="Logo" />
                    </IconButton>
                </MaterialLink>
                <FormControl className={classes.toolbarSearchBar}>
                    <Input id="search-bar"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => { onSearch(searchText); setSearchText('') }}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>}
                    />
                </FormControl>
                {loggedUser ? <AvatarToolbar {...props} user={loggedUser} /> : (
                    <MaterialLink to="/login" component={RouterLink}>
                        <Button variant="outlined" size="small">
                            Sign in
                        </Button>
                    </MaterialLink>
                )
                }
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {sections.filter(section => {
                    return isAdmin ? true : section.adminPage === isAdmin
                }).map((section) => (
                    <MaterialLink
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        to={section.url}
                        className={classes.toolbarLink}
                        component={RouterLink}
                    >
                        {section.title}
                    </MaterialLink>
                ))}
            </Toolbar>
        </React.Fragment>
    )
}

Header.propTypes = {
    sections: PropTypes.array,
};
