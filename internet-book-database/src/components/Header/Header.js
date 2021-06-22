import React from 'react'
import { FormControl, makeStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';

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

    const { sections } = props;

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <IconButton>
                    <img className={classes.logo} src="images/logo.png" alt="Logo"/>
                </IconButton>
                <FormControl className={classes.toolbarSearchBar}>
                    <Input id="search-bar"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>}
                    />
                </FormControl>
                <Button variant="outlined" size="small">
                    Sign in
                </Button>
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        className={classes.toolbarLink}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    )
}

//TO DO proptypes
