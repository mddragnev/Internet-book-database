import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: "500px"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    textWrap: {
        wordWrap: "break-word"
    },
    textContainer: {
        bottom: 0,
        right: 0,
        position: "absolute"
    }
}));

export default function CarouselItem({ item }) {
    const classes = useStyles();

    return (
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${item.imageURL})` }}>
            {<img style={{ display: 'none' }} src={item.imageURL} alt="image" />}
            <div className={classes.overlay} />
            <Grid container className={classes.textContainer}>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom className={classes.textWrap}>
                            {item.name}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph className={classes.textWrap}>
                            {item.description}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}
